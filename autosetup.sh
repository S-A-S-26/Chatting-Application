#!/bin/bash

# Start MongoDB
# kitty @ new-window --new-tab --title "MongoDB" bash -c "sudo systemctl start mongod && mongosh"

# Open split terminal for the chat app server and vite project
#
# kitty @ new-window --tab-title "Chatting_App" bash -c "cd ~/Coding/Mern/Chatting_app/Server && npx nodemon app.js" && # In the second split, navigate to the vite project directory and run the development server
# # kitty @ send-text --match 'title:Chatting_App' bash -c "cd ~/Coding/Mern/Chatting_app/vite-project && yarn dev --host 0.0.0.0"
# kitty @ new-window -m "title:Chatting_App" bash -c "cd ~/Coding/Mern/Chatting_app/vite-project && yarn dev --host 0.0.0.0"
# kitty @ new-window --title "Chatting App" bash -c "cd ~/Coding/Mern/Chatting_app/vite-project && yarn dev --host 0.0.0.0\0"

# Focus back on the first window for MongoDB

#!/bin/bash

# Open a new Kitty terminal and run MongoDB
kitty -e bash -c 'sudo systemctl start mongod && exec mongosh' &

# Open a new Kitty terminal for the Chatting App Server
kitty -e bash -c 'cd ./Server && exec npx nodemon app.js' &

# Open a new Kitty terminal for the Vite project
kitty -e bash -c 'cd ./vite-project && exec yarn dev --host 0.0.0.0' &
