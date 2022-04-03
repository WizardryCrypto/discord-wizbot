#!/bin/bash
CURRENT_DIR=$(pwd)
SUBMODULE="./wcData"
LOGS_DIR="./logs"
WHITELIST_DIR="./whitelist"

# Git Push: discord-wizbot
# Git Push: wcData

# Git Pull: discord-wizbot
function gitPullMaster() {
    echo
    echo "Git | Pull | Master"
    git pull
}

# Git Pull: wcData
function gitPullSubmodule() {
    echo
    echo "Git | Pull | wcData"
    cd $SUBMODULE
    git pull
    cd $CURRENT_DIR
}

# Git Push: discord-wizbot
function gitPushMaster() {
    echo
    echo "Git | Push | Master"
    git Push
}

# Git Push: wcData
function gitPushSubmodule() {
    echo
    echo "Git | Push | wcData"
    cd $SUBMODULE
    git Push
    cd $CURRENT_DIR
}

# Git Monitor: wcData
function gitMonitorSubmodule() {
    echo
    echo "Git | Monitor | wcData"
    cd $SUBMODULE
    inotifywait --exclude ".swp" -m -r -e CLOSE_WRITE -o "$LOGS_DIR/monitor.txt" \
    --fromfile "./inotify.txt" \
    --format="git add ./whitelist/whitelist.txt && git add ./whitelist/whitelist-manifest.json && git commit -m 'Whitelist - Update' && git push origin discord-wizbot" \
    "${WHITELIST_DIR}" | bash &
}

gitPullMaster
gitPullSubmodule
gitMonitorSubmodule