<?php

/**
 * @return array
 */

function getProducts(): array
{
    return [

        [
            "id" => 1,
            "name" => "Jumbo - Boeren Tijgerbrood Bruin",
            "category" => "Brood",
            "price" => 1.28
        ],
        [
            "id" => 2,
            "name" => "Jumbo - Witte Bolletjes - 4 Stuks",
            "category" => "Brood",
            "price" => 1.99
        ],
        [
            "id" => 3,
            "name" => "Lezziz Kipborrelhap Gekruid 500 g",
            "category" => "Vleeswaren",
            "price" => 4.00
        ],
        [
            "id" => 4,
            "name" => "Jumbo Slavink Varken 5 Stuks",
            "category" => "Vleeswaren",
            "price" => 4.50
        ],
        [
            "id" => 5,
            "name" => "Jumbo Druiven Wit Pitloos 500 g",
            "category" => "Fruit",
            "price" => 2.79
        ],
        [
            "id" => 6,
            "name" => "Jumbo Classic Burger Rundvlees 8 Stuks",
            "category" => "Vleeswaren",
            "price" => 9.00
        ],
        [
            "id" => 7,
            "name" => "Jumbo Conference Peren 1KG",
            "category" => "Fruit",
            "price" => 2.19
        ],
        [
            "id" => 8,
            "name" => "Jumbo Garnalen Naturel 150 g",
            "category" => "Vleeswaren",
            "price" => 4.09
        ],
        [
            "id" => 9,
            "name" => "Jumbo - Rozijnen Krentenbollen - 6 Stuks",
            "category" => "Brood",
            "price" => 1.69
        ],
        [
            "id" => 10,
            "name" => "Jumbo Komkommer",
            "category" => "Groenten",
            "price" => 0.95
        ]


    ];
}

function getProductDetails($id): array
{
    $tags = [
        1 => [
            "ingredients" => "Water, volkorenTARWEmeel, TARWEbloem, bakkersgist, tijgerdecoratie (rijstbloem, paneermeel [TARWEbloem, water, gist, zout], dextrose, bakkerszout), moutmeel (GERST, TARWE), bakkerszout, TARWEgluten, enzymen (TARWE), meelverbeteraar: E300, raapzaadolie, emulgator: raapzaadlecithine, E = door EU goedgekeurde hulpstof.",
            "weight" => "1,60/kilo",
            "allergies" => "Bevat: Gerst, Gluten, Tarwe. Kan bevatten: Glutenbevattende granen, Lupine, Melk, Noten, Sesam, Soja"
        ],
        2 => [
            "ingredients" => "TARWEbloem, water, TARWEgries, bakkersgist, geïnactiveerd desempoeder (ROGGE, TARWE), bakkerszout, TARWEgluten, raapzaadolie, suiker, emulgator: E472e (niet dierlijk), gefermenteerde TARWEbloem, conserveermiddelen: E200 en E282, veldbonenmeel, MELKeiwit, erwteneiwit, TARWEmoutmeel, zout, enzymen (TARWE), meelverbeteraar: E300, E = door EU goedgekeurde hulpstof.",
            "weight" => "6,22/kilo",
            "allergies" => "Bevat: Gluten, Melk, Rogge, Tarwe. Kan bevatten: Glutenbevattende granen, Lupine, Sesam, Soja"

        ],
        3 => [
            "ingredients" => "Kippenvleugel 96,6%*, specerijen (knoflookpoeder, komijnzaad, koriander, cayennepeper, kurkuma, gemberpoeder, witte peper, kardemom, karwij, kruidnagel, fenegriekzaad, gerookt paprikapoeder, nootmuskaat, foelie, paprikapoeder), natuurlijk aroma, zonnebloemolie, gemodificeerd maïszetmeel, maïszetmeel, zout, rijstebloem, maltodextrine, gedroogde groenten (ui, paprika), peterselie 0,03%, *Scharrelkip binnengehouden., Geslacht onder gasverdoving.",
            "weight" => "8,00/kilo",
            "allergies" => "N.V.T"
        ],
        4 => [
            "ingredients" => "Varkensvlees Beter Leven 1 ster 82,5%, water, paneermeel (TARWEbloem, gist, zout), zeezout, aardappelzetmeel, specerijen (korianderzaad, witte peper, paprikapoeder, foelie, fenegriekzaad, kardemom), TARWEvezel, varkenseiwit, erwtenvezel, natuurlijk aroma, zout, voedingszuur: E326, antioxidant: E301, E = door EU goedgekeurde hulpstof.",
            "weight" => "0,90/stuk",
            "allergies" => "Bevat: Gluten, Tarwe. Kan bevatten: Gerst, Selderij, Eieren, Melk, Haver, Rogge, Soja"
        ],
        5 => [
            "ingredients" => "Druiven",
            "weight" => "5,58/kilo",
            "allergies" => "N.V.T"
        ],

        6 => [
            "ingredients" => "Rundvlees 88,5%, water, tapiocazetmeel, zout, glucosestroop, aroma's, paneermeel (rijstmeel, aardappelzetmeel, tapiocazetmeel, maltodextrine, zout, gist), specerijen, tomaat, uienextract, antioxidanten: E301 en E331, voedingszuur: E325, conserveermiddel: E262, E = door EU goedgekeurde hulpstof.",
            "weight" => "10,71/kilo",
            "allergies" => "N.V.T"
        ],

        7 => [

        ],

        8 => [

        ],

        9 => [

        ],

        10 => [

        ],
    ];

    return $tags[$id];
}