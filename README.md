# Development
This repository is the X Projet mono repository. Both `back` and `front` apps are versioned here (respectively under *back* and *front* directories).

Branches are defined this way:
- $ `master`: state of production, heroku is auto deploying *production* from this branch
- $ `develop`: state of staging, heroku is auto deploying *staging* from this branch
- $ `feature/${CU_ISSUE_ID}_${SHORT_ISSUE_DESC}`: feature branches (suits well for bug-fixing for the moment).

> Everything on develop should be ready to deploy to production, except special cases (e.g. for QA needs).

## Run locally
### Requirements
- **MongoDB**: up and running with a replica set.
    - **Option 2: install using brew:**
        > Good option if you want the `mongod` process to start automatically along with your computer.
        
        - $ `brew install mongodb-community@7.0`
        - MongoDB will need to run in replica set mode. Add at the end of your mongod config file (`/usr/local/etc/mongod.conf`): 
            ```
            processManagement:
                fork: true
            replication:
                replSetName: "rs0"
            ```
        - $ `brew services start mongodb-community@7.0` starting the service for the first time.
            > To stop mongod running in background: `brew services stop mongodb/brew/mongodb-community@5.0`. Restart is also possible.
        
    > *Or custom installation (see .tool-versions for version).*
    
    - **Configuration**:
        - execute $ `mongosh`:
        - run `rs.initiate()`: initiates the default replica set
        - run `db.adminCommand( { setParameter: 1, maxTransactionLockRequestTimeoutMillis: 5000 })`: increases the maximum lock time from 5ms to 5s, allowing the first heavy operations during seeds to run before seeding.
        - exit `mongosh`
- **Redis**
    - $ `brew install redis`
    - $ `redis-server data/redis.conf --daemonize yes` to run redis as a daemon
        > $ `redis-cli shutdown` to shutdown redis daemon
    > *Or custom installation (see .tool-versions for version).*
- **Node V20**
- **Yarn**
    - $ `asdf plugin add yarn`
    - $ `asdf install yarn` from root directory
    > *Or custom installation (see .tool-versions for version).*
- [Overmind](https://github.com/DarthSim/overmind): or another Procfile manager, will run the project from `./Procfile`.
    - $ `brew install tmux`
    - $ `brew install overmind`

### Installation
- **Back**
    - $ `cd back` from root directory
    - $ `yarn install`
- **Front**
    - $ `cd front` from root directory
    - $ `yarn install`

### Configuration
- **Environment**: $ `touch .env` and ask for the values.
- **ESLint**: install `eslint` VSCode extension to lint and auto fix files on save (VS code config is already set in .vscode).
> If you are not using VSCode, please consider using an alternative to lint errors (and auto-fix errors when possible). (cf .vscode/settings.json to see the VSCode ESLint extension settings) Or run `eslint` for back and front projects.

### Test
- **Back**
    - $ `cd back`
    - $ `yarn test`

### Run
Assuming that you use overmind as Procfile manager:
- $ `overmind s` (from project's root directory)
> By default, all processes are run. You can select the processes you want to run with the `-l` option.
> E.g.: `overmind start -l web,front` will run only `web` and `front` processes.

#### Migrate
Run the following command in the `back` directory in order to generate a new migration:
- $ `yarn run migrate-mongo create the-name-of-your-migration` (from back directory)

To run the migration:
- $ `yarn run migrate-mongo up` (from back directory)

To rollback the migration:
- $ `yarn run migrate-mongo down` (from back directory)
