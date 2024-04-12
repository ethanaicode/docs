# supervisor

When you close the command line or terminate the process, the PHP script running in the background will be stopped. To keep the script running continuously, you can use process management tools like Supervisor. Supervisor ensures that your script restarts automatically in case of failures and runs continuously. Here's how you can set up Supervisor:

### Install Supervisor:

Make sure Supervisor is installed on your system. You can usually install it using your package manager:

```bash
brew install supervisor 					# For Mac by brew
sudo apt-get install supervisor  # For Ubuntu/Debian
sudo yum install supervisor      # For CentOS/RHEL
```

run `brew services start supervisor` now to start supervisor, this will make sure supervisor runs at startup as well.

### Create a Supervisor Configuration File:

we have to create one in order for it to work:

```
echo_supervisord_conf > /usr/local/etc/supervisord.conf
```

now default configuration is set, we need to create the following directory so supervisor can look for your configuration files:

```
mkdir /usr/local/etc/supervisor.d
```

now create your supervisor configuration file in the directory we just created:

```
vim /usr/local/etc/supervisor.d/mailbox_worker.ini
```

Create a Supervisor configuration file for your PHP script. For example, create a file named `mailbox_worker.ini`:

```ini
[program:mailbox_worker]
command=/Applications/MAMP/bin/php/php8.2.0/bin/php /Applications/MAMP/htdocs/timetracker/workers/BackgroundMailProcessor.php
autostart=true
autorestart=true
stderr_logfile=/var/log/mailbox_worker.err.log
stdout_logfile=/var/log/mailbox_worker.out.log
```

Replace `/path/to/your/worker_script.php` with the actual path to your PHP worker script.

### Update Supervisor Configuration:

Tell Supervisor to read the new configuration and start the process:

```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start mailbox_worker
```

Now, Supervisor will manage the execution of your PHP script, and it will automatically restart the script if it crashes or if you stop it manually.

### Monitor the Process:

You can monitor the status of your process using Supervisor:

```bash
sudo supervisorctl status
```

This command will show you the status of all managed processes, including your `mailbox_worker`.

With Supervisor in place, your PHP script will continue running even after you close the command line. It provides a robust solution for managing long-running processes in a production environment.





