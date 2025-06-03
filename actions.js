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
            callback: async (event) => {
                const message = {
                    command: 'addTimer',
                    duration: event.options.duration,
                    timerId: event.options.timerId || undefined,
                }
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
            callback: async (event) => {
                const message = {
                    command: 'stopTimer',
                    timerIndex: event.options.timerIndex,
                }
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
            ],
            callback: async (event) => {
                const message = {
                    command: 'startTimer',
                    timerIndex: event.options.timerIndex,
                }
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
            callback: async (event) => {
                const message = {
                    command: 'setRemaining',
                    timerIndex: event.options.timerIndex,
                    remaining: event.options.remaining,
                }
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
            callback: async (event) => {
                const message = {
                    command: 'sendFilename',
                    filename: event.options.filename,
                }
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
            callback: async (event) => {
                const message = {
                    command: 'deleteTimer',
                    timerIndex: event.options.timerIndex,
                }
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
            callback: async (event) => {
                let value = event.options.presetKey
                if (!value || value === '') {
                    value = event.options.customKey
                }
                const message = {
                    command: 'sendKeyboardInputs',
                    value,
                }
                self.sendAppMessage(message)
            },
        },
        /*start_timer: {
            name: 'Start Timer',
            options: [
                {
                    id: 'timerId',
                    type: 'textinput',
                    label: 'Timer ID (optional)',
                    default: '',
                },
            ],
            callback: async (event) => {
                const message = {
                    command: 'startTimer',
                    timerId: event.options.timerId || undefined,
                }
                self.sendAppMessage(message)
            },
        },

        pause_timer: {
            name: 'Pause Timer',
            options: [
                {
                    id: 'timerId',
                    type: 'textinput',
                    label: 'Timer ID (optional)',
                    default: '',
                },
            ],
            callback: async (event) => {
                const message = {
                    command: 'pauseTimer',
                    timerId: event.options.timerId || undefined,
                }
                self.sendAppMessage(message)
            },
        },

        reset_timer: {
            name: 'Reset Timer',
            options: [
                {
                    id: 'timerId',
                    type: 'textinput',
                    label: 'Timer ID (optional)',
                    default: '',
                },
            ],
            callback: async (event) => {
                const message = {
                    command: 'resetTimer',
                    timerId: event.options.timerId || undefined,
                }
                self.sendAppMessage(message)
            },
        },

        set_timer: {
            name: 'Set Timer Duration',
            options: [
                {
                    id: 'duration',
                    type: 'textinput',
                    label: 'Duration (in seconds)',
                    default: '60',
                },
                {
                    id: 'timerId',
                    type: 'textinput',
                    label: 'Timer ID (optional)',
                    default: '',
                },
            ],
            callback: async (event) => {
                const message = {
                    command: 'setTimer',
                    duration: event.options.duration,
                    timerId: event.options.timerId || undefined,
                }
                self.sendAppMessage(message)
            },
        },

        get_remaining: {
            name: 'Get Remaining Time',
            options: [
                {
                    id: 'timerId',
                    type: 'textinput',
                    label: 'Timer ID (optional)',
                    default: '',
                },
            ],
            callback: async (event) => {
                const message = {
                    command: 'getRemaining',
                    timerId: event.options.timerId || undefined,
                }
                self.sendAppMessage(message)
            },
        },

        set_root_directory: {
            name: 'Set Root Directory',
            options: [
                {
                    id: 'directory',
                    type: 'textinput',
                    label: 'Root Directory Path',
                    default: '',
                },
            ],
            callback: async (event) => {
                const message = {
                    command: 'setRootDirectory',
                    rootDirectory: event.options.directory,
                }
                self.sendAppMessage(message)
            },
        },

        open_file: {
            name: 'Open File',
            options: [
                {
                    id: 'filePath',
                    type: 'textinput',
                    label: 'File Path',
                    default: '',
                },
            ],
            callback: async (event) => {
                const message = {
                    command: 'openFile',
                    filePath: event.options.filePath,
                }
                self.sendAppMessage(message)
            },
        },

        broadcast_file_list: {
            name: 'Broadcast File List',
            options: [],
            callback: async (event) => {
                const message = {
                    command: 'broadcastFileList',
                }
                self.sendAppMessage(message)
            },
        },

        send_keyboard_input: {
            name: 'Send Keyboard Input',
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
                    label: 'Custom Key (wird verwendet, wenn kein Preset gewählt ist)',
                    default: '',
                },
            ],
            callback: async (event) => {
                let value = event.options.presetKey
                if (!value || value === '') {
                    value = event.options.customKey
                }
                const message = {
                    command: 'sendKeyboardInput',
                    value,
                }
                self.sendAppMessage(message)
            },
        },

        generic_command: {
            name: 'Custom Command (Advanced)',
            options: [
                {
                    id: 'command',
                    type: 'textinput',
                    label: 'Command Name',
                    default: '',
                },
                {
                    id: 'value',
                    type: 'textinput',
                    label: 'Value (optional)',
                    default: '',
                },
                {
                    id: 'filePath',
                    type: 'textinput',
                    label: 'File Path (optional)',
                    default: '',
                },
            ],
            callback: async (event) => {
                const message = {
                    command: event.options.command,
                }
                if (event.options.value) message.value = event.options.value
                if (event.options.filePath) message.filePath = event.options.filePath
                self.sendAppMessage(message)
            },
        },
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
                {
                    id: 'timerId',
                    type: 'textinput',
                    label: 'Timer ID (optional)',
                    default: '',
                },
            ],
            callback: async (event) => {
                const message = {
                    command: 'addTimer',
                    duration: event.options.duration,
                    timerId: event.options.timerId || undefined,
                }
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
            callback: async (event) => {
                const message = {
                    command: 'stopTimer',
                    timerIndex: event.options.timerIndex,
                }
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
            ],
            callback: async (event) => {
                const message = {
                    command: 'startTimer',
                    timerIndex: event.options.timerIndex,
                }
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
            callback: async (event) => {
                const message = {
                    command: 'setRemaining',
                    timerIndex: event.options.timerIndex,
                    remaining: event.options.remaining,
                }
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
            callback: async (event) => {
                const message = {
                    command: 'sendFilename',
                    filename: event.options.filename,
                }
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
            callback: async (event) => {
                const message = {
                    command: 'deleteTimer',
                    timerIndex: event.options.timerIndex,
                }
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
            callback: async (event) => {
                let value = event.options.presetKey
                if (!value || value === '') {
                    value = event.options.customKey
                }
                const message = {
                    command: 'sendKeyboardInputs',
                    value,
                }
                self.sendAppMessage(message)
            },
        },*/
    })
}

module.exports.sendAppMessage = function (message) {
    // Hier Nachricht an App senden (z.B. TCP/UDP/WS)
    console.log('Send to App:', JSON.stringify(message))
}
