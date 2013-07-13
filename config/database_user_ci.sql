GRANT ALL PRIVILEGES ON  `ledita-web-app`.* TO  'travis' WITH GRANT OPTION ;
CREATE USER 'ledita' IDENTIFIED BY 'web*app01';
GRANT SELECT ON  `ledita-web-app`.* TO  'ledita';