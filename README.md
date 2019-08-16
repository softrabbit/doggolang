# Doggolang

## Tausta
Tehtävänanto on peräisin Wunderdogin koodipähkinästä nro 10, jossa oli tarkoitus luoda tulkki yksinkertaiselle ohjelmointikielelle: https://github.com/wunderdogsw/wunderpahkina-vol10.
Koodia ei lähetetty kisaan, koska voittajaksi valittaisiin elegantein ratkaisu, eikä tämä koodi ole eleganttia nähnytkään.

## Rakenne
Tulkki koostuu luokasta `Doggolang`, jossa tarvittavat datarakenteet skriptin ja muuttujien arvojen säilyttämiselle sekä skriptin ajamiselle. Tulkin `run`-metodi kutsuu `execute`-metodia kulloinkin suoritusvuorossa olevan rivin kohdalla ja mikäli suoritus päättyy, palauttaa paluuarvon. `execute` kutsuu tarpeen mukaan apumetodeja: `evaluate` matemaattisten lausekkeiden arviointiin sekä `skipAhead` ja `jumpBack`, joilla ehtolauseet ja silmukat on toteutettu.

Koodi on frameworkeistä ja muista ulkoisista riippuvuuksista vapaa ja käyttää ECMAScript-moduuleja (.mjs).

## Ohjelman suorittaminen
**1. Kloonaa koodi**

Tämä tapahtuu esim. komentoriviltä käskyllä `git clone https://softrabbit@github.com/softrabbit/doggolang.git`

**2. Aja koodi**

Koska pääasiallinen koodi on skriptitulkki, tämän projektin ajettava koodi löytyy `tests/runner.mjs`-moduulista, joka lataa ja suorittaa testit ja samalla toimii esimerkkinä luokan käytöstä. Käyttämässäni ympäristössä (Ubuntu, jossa Node.js 8.10) tämä on tapahtunut käskemällä `nodejs --experimental-modules tests/runner.mjs`, mutta periaatteessa minkä tahansa suht. modernin Javascript-ympäristön pitäisi pystyä ajamaan tämä.

