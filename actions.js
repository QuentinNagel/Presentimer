module.exports = function (self) {
    self.setActionDefinitions({
        // In actions.js (innerhalb von self.setActionDefinitions({ … }))
        add_timer: {
            name: 'Add Timer',
            options: [
                {
                    id: 'duration',
                    type: 'number',
                    label: 'Duration (in seconds)',
                    default: 60,
                    min: 1,
                    max: 86400,
                },
            ],
            callback: async function (event) {
                self.log('debug', 'add_timer callback ausgelöst, options=' + JSON.stringify(event.options))
                const message = {
                    command: 'timerAdd',
                    remaining: event.options.duration,
                }
                self.log('debug', 'Sending message: ' + JSON.stringify(message))
                self.sendAppMessage(message)
            },
        },

        stop_timer_by_index: {
            name: 'Stop Timer By Index',
            options: [
                {
                    id: 'timerIndex',
                    type: 'number',
                    label: 'Timer Index',
                    default: 0,
                    min: 0,
                },
            ],
            callback: async function (event) {
                self.log('debug', 'stop_timer_by_index callback ausgelöst, options=' + JSON.stringify(event.options))
                const message = {
                    command: 'timerStop',
                    index: event.options.timerIndex,
                    remaining: 0,
                }
                self.log('debug', 'Sending message: ' + JSON.stringify(message))
                self.sendAppMessage(message)
            },
        },

        start_timer_by_index: {
            name: 'Start Timer By Index',
            options: [
                {
                    id: 'timerIndex',
                    type: 'number',
                    label: 'Timer Index',
                    default: 0,
                    min: 0,
                },
                {
                    id: 'remaining',
                    type: 'number',
                    label: 'Remaining Time (seconds, optional – leave blank to use current timer value)',
                    default: null,
                    min: 0,
                    optional: true,
                },
            ],
            callback: async function (event) {
                self.log('debug', 'start_timer_by_index callback ausgelöst, options=' + JSON.stringify(event.options))
                const message = {
                    command: 'timerStart',
                    index: event.options.timerIndex,
                }
                if (event.options.remaining !== null && event.options.remaining !== undefined && event.options.remaining !== '') {
                    message.remaining = event.options.remaining
                }
                self.log('debug', 'Sending message: ' + JSON.stringify(message))
                self.sendAppMessage(message)
            },
        },

        set_remaining_by_index: {
            name: 'Set Remaining By Index',
            options: [
                {
                    id: 'timerIndex',
                    type: 'number',
                    label: 'Timer Index',
                    default: 0,
                    min: 0,
                },
                {
                    id: 'remaining',
                    type: 'number',
                    label: 'Remaining Time (seconds)',
                    default: 0,
                    min: 0,
                },
            ],
            callback: async function (event) {
                self.log('debug', 'set_remaining_by_index callback ausgelöst, options=' + JSON.stringify(event.options))
                const message = {
                    command: 'updateTimer',
                    index: event.options.timerIndex,
                    remaining: event.options.remaining,
                }
                self.log('debug', 'Sending message: ' + JSON.stringify(message))
                self.sendAppMessage(message)
            },
        },

        send_filename: {
            name: 'Send Filename',
            options: [
                {
                    id: 'filename',
                    type: 'textinput',
                    label: 'Filename (with extension)',
                    default: '',
                },
            ],
            callback: async function (event) {
                self.log('debug', 'send_filename callback ausgelöst, options=' + JSON.stringify(event.options))
                const message = {
                    command: 'openFile',
                    filePath: event.options.filename,
                }
                self.log('debug', 'Sending message: ' + JSON.stringify(message))
                self.sendAppMessage(message)
            },
        },

        delete_timer: {
            name: 'Delete Timer',
            options: [
                {
                    id: 'timerIndex',
                    type: 'number',
                    label: 'Timer Index',
                    default: 0,
                    min: 0,
                },
            ],
            callback: async function (event) {
                self.log('debug', 'delete_timer callback ausgelöst, options=' + JSON.stringify(event.options))
                const message = {
                    command: 'timerDelete',
                    index: event.options.timerIndex,
                    remaining: 0,
                }
                self.log('debug', 'Sending message: ' + JSON.stringify(message))
                self.sendAppMessage(message)
            },
        },

        send_keyboard_inputs_plural: {
            name: 'Send Keyboard Inputs',
            options: [
                {
                    id: 'presetKey',
                    type: 'dropdown',
                    label: 'Preset Key',
                    default: '',
                    choices: [
                        { id: '', label: 'Custom...' },
                        // Zahlen
                        { id: '1', label: '1' },
                        { id: '2', label: '2' },
                        { id: '3', label: '3' },
                        { id: '4', label: '4' },
                        { id: '5', label: '5' },
                        { id: '6', label: '6' },
                        { id: '7', label: '7' },
                        { id: '8', label: '8' },
                        { id: '9', label: '9' },
                        { id: '0', label: '0' },
                        // Steuerung & Sondertasten
                        { id: 'Enter', label: 'Enter (Enter)' },
                        { id: 'cmdEnter', label: 'Enter (cmdEnter)' },
                        { id: 'cmdQ', label: 'cmdQ' },
                        { id: 'cmd', label: 'cmd' },
                        { id: 'cmdEsc', label: 'Escape (esc)' },
                        { id: ' ', label: 'Leertaste ( )' },      // wirklich ein Space!
                        // Pfeiltasten
                        { id: '←', label: 'Arrow Left (←)' },
                        { id: '→', label: 'Arrow Right (→)' },
                        { id: '↑', label: 'Arrow Up (↑)' },
                        { id: '↓', label: 'Arrow Down (↓)' },
                        // Vollbild
                        { id: 'ctrlCmdF', label: 'Vollbild (ctrlCmdF)' },
                    ],
                },
                {
                    id: 'customKey',
                    type: 'textinput',
                    label: 'Custom Key (used if no preset chosen)',
                    default: '',
                },
            ],
            callback: async function (event) {
                self.log('debug', 'send_keyboard_inputs_plural callback ausgelöst, options=' + JSON.stringify(event.options))
                let value = event.options.presetKey
                if (!value || value === '') {
                    value = event.options.customKey
                }
                const message = {
                    command: 'sendKeyboardInput',
                    filePath: value,
                }
                self.log('debug', 'Sending message: ' + JSON.stringify(message))
                self.sendAppMessage(message)
            },
        },
    })
}
