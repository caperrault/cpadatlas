"CPAD DATA SNAPSHOT" README
by Charles-Antoine Perrault, January 2015

http://www.calands.org/data/snapshot


PROJECT STRUCTURE

HTML is located in index.html
CSS is located in css/stylesheet.css

JS is located in the js folder, which contains 8 different JS scripts:
1. cityinfo.js controls the display of selected city name, CPAD acreage, city population, CPAD acres per inhabitant (top right corner in the city section)
2. cityMap.js controls the map in the city section
3. cityPie1.js controls the top donut chart in the city section (CPAD areas by access)
4. cityPie2.js controls the bottom donut chart in the city section (CPAD areas by agency type)
5. countyInfo.js controls the display of selected county name, CPAD acreage, city population, CPAD acres per inhabitant (top right corner in the county section)
6. countyMap.js controls the map in the county section
7. countyPie1.js controls the top donut chart in the county section (CPAD areas by access)
8. countyPie2.js controls the bottom donut chart in the city section (CPAD areas by agency type)

N.B. The two JS scripts that control the city and county table views are embedded in the index.html file.


DATA

Data comes from 4 different json files and 4 different csv file.

Json:

1. CPAD_counties2.json (topojson) contains the data for the map in the county section.
   It has 4 attribute fields: 1."County": name of the county
                              2. "ac_tot": total CPAD acreage in the county
                              3. "POP_NORM": CPAD acres per 1,000 inhabitants in the county
                              4. "Tot_Pop": total population in the county

2. CA_perlargestcities_topo.json (topojson) contains the data for the map in the city section.
   It has 4 attribute fields: 1."Name": name of the city
                              2. "Tot_Pop": total population in the city
                              3. "POP_NORM": CPAD acres per 1,000 inhabitants in the city
                              4. "ac_tot": total CPAD acreage in the city

3. Counties_statsCorrected4.json contains the data for the table in the county section.
   It has 4 attribute fields: 1. "County": name of the county
                              2. "Total CPAD Acreage": total CPAD acreage in the county
                              3. "CPAD Acres per 1,000 Inh." CPAD acres per 1,000 inhabitants in the county
                              4. "County Population": total population in the county

4. LargestCities50_Cpad_withpop.json contains the data for the table in the city section.
   It has 4 attribute fields: 1. "City": name of the city
                              2. "Total CPAD Acreage": total CPAD acreage in the city
                              3. "CPAD Acres per 1,000 Inh.": CPAD acres per 1,000 inhabitants in the city
                              4. "City Population": total population in the city

Csv:

1. Access_type_allcounties_perc.csv contains the data for the top donut chart (access type) in the county section.
   Here is an example of how it is structured:

   Access_type,Alameda,Alpine,Amador,Butte,Calaveras,Colusa,Contra Costa,Del Norte,El Dorado,Fresno,Glenn,Humboldt,Imperial,Inyo,Kern,Kings,Lake,Lassen,Los Angeles,Madera,Marin,Mariposa,Mendocino,Merced,Modoc,Mono,Monterey,Napa,Nevada,Orange,Placer,Plumas,Riverside,Sacramento,San Benito,San Bernardino,San Diego,San Francisco,San Joaquin,San Luis Obispo,San Mateo,Santa Barbara,Santa Clara,Santa Cruz,Shasta,Sierra,Siskiyou,Solano,Sonoma,Stanislaus,Sutter,Tehama,Trinity,Tulare,Tuolumne,Ventura,Yolo,Yuba
   Open access,59,99,95,84,94,88,67,99,100,98,85,97,97,100,84,100,98,97,93,100,87,100,86,37,98,99,86,57,96,79,99,100,94,57,100,99,93,98,35,89,48,83,68,73,100,95,99,19,44,54,6,84,100,98,100,99,56,72
   Restricted access (with permit),36,1,0,16,0,10,23,1,0,1,11,3,1,0,14,0,2,2,5,0,10,0,2,56,2,1,7,34,4,12,0,0,5,30,0,1,5,0,9,10,31,17,20,7,0,5,1,64,32,12,74,16,0,1,0,1,31,26
   No public access,5,0,5,0,6,2,10,0,0,0,4,0,2,0,1,0,0,0,1,0,3,0,9,7,0,0,6,7,0,0,0,0,1,4,0,0,2,2,56,1,21,0,11,20,0,0,0,15,23,34,20,0,0,1,0,1,0,0
   Unknown access,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,3,0,0,0,0,2,0,9,0,0,1,10,0,0,0,0,0,0,0,0,1,0,0,0,0,3,1,0,0,0,0,0,0,0,13,2

2. Agency_lev_allcounties_perc5.csv contains the data for the bottom donut chart (agency type) in the county section.
   Here is an example of how it is structured:

   Agency_lev,Alameda,Alpine,Amador,Butte,Calaveras,Colusa,Contra Costa,Del Norte,El Dorado,Fresno,Glenn,Humboldt,Imperial,Inyo,Kern,Kings,Lake,Lassen,Los Angeles,Madera,Marin,Mariposa,Mendocino,Merced,Modoc,Mono,Monterey,Napa,Nevada,Orange,Placer,Plumas,Riverside,Sacramento,San Benito,San Bernardino,San Diego,San Francisco,San Joaquin,San Luis Obispo,San Mateo,Santa Barbara,Santa Clara,Santa Cruz,Shasta,Sierra,Siskiyou,Solano,Sonoma,Stanislaus,Sutter,Tehama,Trinity,Tulare,Tuolumne,Ventura,Yolo,Yuba
   Federal,19,100,95,82,96,98,1,90,98,99,99,86,89,93,95,96,96,99,83,99,57,99,74,72,100,93,88,80,94,46,97,99,93,37,93,96,39,39,1,91,13,97,1,0,97,100,100,16,24,4,0,98,100,99,100,92,64,82
   State,10,0,0,13,2,1,32,10,1,0,0,13,5,1,2,0,3,1,6,0,12,0,25,26,0,3,5,13,5,10,1,1,4,14,7,3,47,4,28,5,31,1,46,86,2,0,0,5,58,71,0,1,0,0,0,4,5,2
   County,6,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,2,0,1,0,0,1,0,0,2,0,0,24,0,0,1,13,0,0,2,11,9,4,25,1,30,2,0,0,0,0,9,18,0,0,0,0,0,1,3,0
   City,11,0,0,3,0,0,7,0,0,0,0,0,0,6,0,2,0,0,5,0,2,0,0,1,0,4,0,3,0,10,1,0,0,8,0,0,6,46,33,1,7,1,6,8,0,0,0,54,4,4,13,0,0,0,0,1,6,1
   Special District,55,0,5,0,2,0,58,0,0,0,0,0,6,0,0,0,0,0,4,0,28,1,0,0,0,0,4,4,1,0,0,0,1,9,0,0,4,0,29,0,24,0,17,3,0,0,0,4,3,2,43,0,0,0,0,3,0,16
   Non Profit,0,0,0,1,0,0,1,0,0,0,1,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,1,0,10,0,0,1,15,0,0,0,0,0,0,0,0,0,1,0,0,0,21,3,0,44,1,0,0,0,0,17,0
   Private,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0
   Unknown,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0

3. CPAD_50largestcities_accessType.csv contains the data for the top donut chart (access type) in the city section.
   Here is an example of how it is structured:

   Access_type,Anaheim,Bakersfield,Chula Vista,Concord,Corona,East Los Angeles,Elk Grove,Escondido,Fontana,Fremont,Fresno,Fullerton,Garden Grove,Glendale,Hayward,Huntington Beach,Irvine,Lancaster,Long Beach,Los Angeles,Modesto,Moreno Valley,Oakland,Oceanside,Ontario,Orange,Oxnard,Palmdale,Pasadena,Pomona,Rancho Cucamonga,Riverside,Roseville,Sacramento,Salinas,San Bernardino,San Diego,San Francisco,San Jose,Santa Ana,Santa Clara,Santa Clarita,Santa Rosa,Simi Valley,Stockton,Sunnyvale,Thousand Oaks,Torrance,Vallejo,Visalia
   Open Access,57,40,90,100,100,100,94,99,100,88,77,98,100,99,54,98,47,100,100,92,97,70,89,85,100,49,77,10,100,100,100,91,79,92,95,93,97,98,57,100,100,100,43,100,100,37,90,89,25,100
   Restricted Access (with permit),1,59,6,0,0,0,6,0,0,12,13,2,0,0,42,1,32,0,0,2,3,30,11,7,0,0,0,0,0,0,0,9,0,8,0,0,1,0,36,0,0,0,11,0,0,63,5,0,75,0
   No Public Access,0,1,1,0,0,0,0,1,0,0,0,0,0,1,4,0,1,0,0,6,0,0,0,3,0,0,23,0,0,0,0,0,21,0,0,7,1,2,5,0,0,0,46,0,0,0,4,11,0,0
   Unknown Access,42,0,2,0,0,0,0,0,0,0,10,0,0,0,0,1,21,0,0,0,0,0,0,5,0,51,0,89,0,0,0,0,0,0,5,0,1,0,2,0,0,0,0,0,0,0,1,0,0,0

4. CPAD_50largestcities_agencyLevel.csv contains the data for the bottom donut chart (agency type) in the city section.
   Here is an example of how it is structured:

   Agency_lev,Anaheim,Bakersfield,Chula Vista,Concord,Corona,East Los Angeles,Elk Grove,Escondido,Fontana,Fremont,Fresno,Fullerton,Garden Grove,Glendale,Hayward,Huntington Beach,Irvine,Lancaster,Long Beach,Los Angeles,Modesto,Moreno Valley,Oakland,Oceanside,Ontario,Orange,Oxnard,Palmdale,Pasadena,Pomona,Rancho Cucamonga,Riverside,Roseville,Sacramento,Salinas,San Bernardino,San Diego,San Francisco,San Jose,Santa Ana,Santa Clara,Santa Clarita,Santa Rosa,Simi Valley,Stockton,Sunnyvale,Thousand Oaks,Torrance,Vallejo,Visalia
   Federal,0,1,12,0,14,0,0,0,37,65,0,0,0,32,18,0,0,0,0,11,0,0,0,0,0,0,0,2,61,0,0,0,0,3,0,52,3,39,34,0,0,74,0,0,0,64,0,0,1,0
   State,12,7,4,0,2,0,0,0,0,0,13,0,0,5,42,13,3,0,0,27,0,73,27,10,0,0,38,0,0,0,0,19,0,21,0,0,7,4,0,0,0,0,10,0,0,0,0,0,61,0
   County,36,5,3,0,0,95,26,3,0,0,6,17,90,3,0,60,31,26,0,3,0,1,0,13,8,48,1,0,1,43,0,17,0,7,17,0,7,11,22,78,0,11,11,2,1,11,4,4,0,19
   City,10,85,75,75,84,5,21,95,63,15,54,81,10,60,0,28,40,74,97,44,100,21,49,66,92,4,38,9,38,57,99,62,99,61,78,40,81,46,24,21,65,4,70,17,99,24,16,96,18,77
   Special District,0,3,2,0,0,0,53,0,0,20,1,0,0,0,40,0,0,0,3,13,0,5,24,2,0,0,0,90,0,0,1,1,0,8,0,7,1,0,20,0,35,11,8,81,0,2,81,0,6,4
   Non Profit,42,0,4,0,0,0,0,1,0,0,25,0,0,0,0,0,23,0,0,1,0,0,0,9,0,48,23,0,0,0,0,0,0,0,5,0,1,0,0,0,0,0,1,0,0,0,0,1,14,0
   Private,0,0,1,0,0,0,0,0,0,0,0,2,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0
   Unknown,0,0,0,24,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0

N.B. All numbers are rounded within all the json and csv files
