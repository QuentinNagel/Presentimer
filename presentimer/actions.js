const net = require('net')

module.exports = function (self) {
    self.setActionDefinitions({
        start_timer: {
            name: 'Start Timer',
            options: [],
            callback: async (event) => {
                // Hole Host/Port aus self.config (kommt aus getConfigFields)
                const host = self.config.host || '127.0.0.1'
                const port = parseInt(self.config.port, 10) || 6000

                // Erstelle TCP-Client
                const client = new net.Socket()

                client.connect(port, host, () => {
                    // Verbindung erfolgreich, Nachricht senden
                    client.write('{"command":"timerStart"}\n', () => {
                        client.end() // Verbindung sauber schließen
                    })
                })

                client.on('error', (err) => {
                    // Fehler bei Verbindung oder Übertragung
                    self.log('error', `TCP connection error: ${err.message}`)
                    client.destroy()
                })

                client.on('close', () => {
                    // Verbindung wurde geschlossen (optional loggen)
                    self.log('debug', 'TCP connection closed')
                })
            },
        },
    })
}
