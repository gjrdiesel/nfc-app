# NFC App

This app takes in a CSV of members then lets you associate an RFID badge with each member
so that member can log in or log out with the badge.

This app will save the UID back to the member CSV as well as create a `signin.csv` so you will have
a log of all the people who have signed in.

<a href="https://www.youtube.com/watch?v=7-MVB1sp2Mg"><img src="images/example.gif"></a>

## Installation

Eventually I'd like to automate this in a script but for now, do the following commands:

```bash
# Log into your raspberry pi
ssh pi@192.168.1.203

# Make sure you're in the home directory
cd ~/

# Install some required software
sudo su

# Install NFC libraries
apt install libnfc-bin
apt install libpcsclite-dev
apt install pcscd

# Setup MySQL server
apt install mariadb-server

# No longer needed: Use 
# TablesPlus to import
# mysql -u root nfc --local-infile=1 < setup.sql

# Setup mysql user
# Run these commands in mysql
sudo mysql

# Then run:
DROP USER 'root'@'localhost';
CREATE USER 'root'@'%' IDENTIFIED BY '';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

# Install Node 10
curl -sL https://deb.nodesource.com/setup_10.x | bash -
apt-get install -y nodejs

# Exit sudo 
exit

# Install a "node server" (process manager)
npm install -g pm2

git clone https://github.com/gjrdiesel/nfc-app.git

# Go to new directory
cd nfc-app

# Install dependencies
npm install
npm install nfc-pcsc

# Start server
pm2 start bin/www --watch

# Run PM2 on start up
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u pi --hp /home/pi

# Save 
pm2 save

# Make Chromium Start on Bootup
cat "/usr/bin/chromium-browser --disable-restore-session-state --kiosk http://localhost:3000/" >> /etc/xdg/lxsession/LXDE-pi/autostart
```

### With installation complete

Visit http://your-pi-ip:3000 (Your Pi IP Address w/ Port 3000)

# Real member data
To use real member data with this app, replace `members/members.csv` with your own.

E.g. run this command from a folder on your computer that that has a `Member_Blank_UID_Export.csv`
```bash
scp Member_Blank_UID_Export.csv pi@192.168.168.1.203:~/nfc-app/members/members.csv
```
