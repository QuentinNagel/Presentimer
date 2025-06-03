const net = require('net')

module.exports = function (self) {
    self.setActionDefinitions({
        start_timer: {
            name: 'Start Timer',
            options: [],
            callback: async (event) => {
                const client = new net.Socket()
                client.connect(self.config.port, self.config.host, () => {
                    client.write('{"command":"timerStart"}\n')
                    client.end()
                })
                client.on('error', (err) => {
                    console.error('TCP connection error:', err)
                })
            },
        },
    })
}
