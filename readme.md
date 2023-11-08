# Onboard-Repo

Onboard-Repo is a simple CLI tool for onboarding new developers to your repo.

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm (Comes with Node.js)

### Installation

You can install `onboard-repo` globally via npm which allows you to use it in any project.

```bash
npm install -g onboard-repo
```

Or you can use npx to run onboard-repo without installing it globally:

```bash
npx onboard-repo <command>
```

### Available Commands
`init`

The `init` command prepares a new project with an `.onboard` folder with a basic configuration file and an empty files folder. You then create your ejs templates inside the files folder and reference them in your configuration file.

`run`

The `run` command reads the `config.yaml` file and performs the required actions. Currently the only expected action is the creation of new files. 

`gitignore`

The `gitignore` command will add the files you have added to your `config.yaml` to your root's `.gitignore`.


## Config.yaml

The `config.yaml` file in the `.onboard` directory currently only supports a `files` configuration:

```yaml
files:
  - input: .onboard/files/devcontainer.json.ejs
    output: .devcontainer/devcontainer.json
    variables:
      - name: ONBOARD_MOUNT_SSH_PATH
        source: .env
      - name: ONBOARD_USER
        source: .env
```

`input`: where the file is located <br/>
`output`: where to output the created file <br/>
`variables`: defining where to find the variables used in the input ejs file <br/>

## Contributing

Any contributions you make are greatly appreciated. To contribute:

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes using conventional commits syntax (git commit -m 'feat: add some amazing feature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## Roadmap 
- [x] Add license information
- [ ] Find out how to get a changelog with semver 
- [ ] Review versioning logic for new published features
- [ ] Add a readme on the generated .onboard folder
- [ ] Review contribution instructions for this repo
- [ ] Add a configuration option with files depending on the OS
- [ ] Review if init command should just be replaced with onboard-repo without any command
- [ ] On init command, prompt user to select files, selected files are automatically turned into ejs files and added to the config.yaml