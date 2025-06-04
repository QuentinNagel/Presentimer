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
                    label: 'Remaining Time (seconds)',
                    default: 0,
                    min: 0,
                },
            ],
            callback: async function (event) {
                self.log('debug', 'start_timer_by_index callback ausgelöst, options=' + JSON.stringify(event.options))
                const message = {
                    command: 'timerStart',
                    index: event.options.timerIndex,
                    remaining: event.options.remaining !== undefined ? event.options.remaining : 0,
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
                        { id: 'Enter', label: 'Enter' },
                        { id: 'Space', label: 'Space' },
                        { id: 'Left', label: 'Arrow Left' },
                        { id: 'Right', label: 'Arrow Right' },
                        { id: 'Up', label: 'Arrow Up' },
                        { id: 'Down', label: 'Arrow Down' },
                        { id: 'F4', label: 'F4' },
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
