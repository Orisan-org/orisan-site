"""Run a command under a 120x34 pseudo-terminal.

asciinema needs a real TTY to record in full mode, and the published mcpscan wheel
hardcodes Console(width=120), so the report wraps on anything narrower. The winsize
is set in the child before exec so the size is correct from the first byte.
"""
import os, pty, sys, fcntl, termios, struct, select

COLS, ROWS = 120, 34
argv = sys.argv[1:]
pid, fd = pty.fork()
if pid == 0:
    fcntl.ioctl(0, termios.TIOCSWINSZ, struct.pack("HHHH", ROWS, COLS, 0, 0))
    os.environ["TERM"] = "xterm-256color"
    os.environ["COLUMNS"] = str(COLS)
    os.environ["LINES"] = str(ROWS)
    os.execvp(argv[0], argv)
fcntl.ioctl(fd, termios.TIOCSWINSZ, struct.pack("HHHH", ROWS, COLS, 0, 0))
buf = []
while True:
    r, _, _ = select.select([fd], [], [], 1.0)
    if fd in r:
        try:
            data = os.read(fd, 65536)
        except OSError:
            break
        if not data:
            break
        buf.append(data)
    else:
        wpid, _ = os.waitpid(pid, os.WNOHANG)
        if wpid == pid:
            break
sys.stdout.buffer.write(b"".join(buf))
