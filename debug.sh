# 1.命令行调试(略)
node debug debug.js

# 2.远程调试(--debug启动调试服务器, 默认端口5858)
node --debug[=port] debug.js
node --debug-brk[=port] debug.js

# 例: node --debug=1234 debug.js
# 在另一个端口: node debug 127.0.0.1:1234

# 3.IDE调试(√)
