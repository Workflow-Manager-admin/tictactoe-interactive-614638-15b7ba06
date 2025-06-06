#!/bin/bash
cd /tmp/kavia/workspace/code-generation/tictactoe-interactive-614638-15b7ba06/tic_tac_toe
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

