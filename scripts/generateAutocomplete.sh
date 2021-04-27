#!/bin/bash
AUTOCOMPLETE_BASH_CODE=`node bundled __generate_completion`
echo -e "$AUTOCOMPLETE_BASH_CODE" > bundled/autocompletion.txt