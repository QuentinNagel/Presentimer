const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')
const net = require('net')

class ModuleInstance extends InstanceBase {
    constructor(internal) {
        super(internal)
    }

    async init(config) {
        this.config = config

        this.updateStatus(InstanceStatus.Ok)

        this.socket = new net.Socket()

        this.socket.on('error', (err) => {
            this.log('error', `Socket error: ${err.message}`)
        })

        this.socket.on('close', () => {
            this.log('warn', 'Socket closed')
        })

        try {
            this.socket.connect(
                Number(this.config.port),
                this.config.host,
                () => {
                    this.log('info', `Connected to ${this.config.host}:${this.config.port}`)
                    this.updateStatus(InstanceStatus.Ok)
                }
            )
        } catch (err) {
            this.log('error', `Connect exception: ${err.message}`)
        }

        this.updateActions() // export actions
        this.updateFeedbacks() // export feedbacks
        this.updateVariableDefinitions() // export variable definitions
    }
    // When module gets deleted
    async destroy() {
        this.log('debug', 'destroy')
    }

    async configUpdated(config) {
        this.config = config
    }

    // Return config fields for web config
    getConfigFields() {
        return [
          {
            type: 'textinput',
            id: 'host',
            label: 'Target IP',
            width: 8,
            regex: Regex.IP,
            default: '127.0.0.1',
          },
          {
            type: 'textinput',
            id: 'port',
            label: 'Target Port',
            width: 4,
            regex: Regex.PORT,
            default: '6000',
          },
        ];
      }

    updateActions() {
        UpdateActions(this)
    }

    updateFeedbacks() {
        UpdateFeedbacks(this)
    }

    updateVariableDefinitions() {
        UpdateVariableDefinitions(this)
    }
}

runEntrypoint(ModuleInstance, UpgradeScripts)
