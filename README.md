# Discord.bot
This is my attempt at a Cybernations based Discord bot based off Discord.js.

# To Run
1. Create auth.json file in the main directoy, adding your Discord token under the token key.

    ```json
    {
        "token": "YOUR TOKEN HERE"
    }
    ```

1. Run npm install
1. Run node index.js

# To do
[ ] Refactor presence handler into its own module, with other DB interactions.

[ ] Refactor plugins to remove repeated code. 

[ ] Refactor plugins to have their own help function.