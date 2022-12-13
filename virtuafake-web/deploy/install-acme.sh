
curl https://get.acme.sh | sh -s email=u4t145@163.com
alias acme.sh=~/.acme.sh/acme.sh

acme.sh --issue -d vrp.4t145.com --webroot /var/www/virtuafake/ --standalone

acme.sh --install-cert -d vrp.4t145.com \
--cert-file      /var/www/.cert/virtuafake.cert  \
--key-file       /var/www/.cert/virtuafake.key  \
--fullchain-file /var/www/.cert/virtuafake.cert  \