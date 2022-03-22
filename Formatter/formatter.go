package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"log"
	"os"
)

func getCantons() []string {
 	return []string{"ag", "ai", "ar", "be", "bl", "bs", "fr", "ge", "gl", "gr", "ju", "lu", "ne", "nw", "ow", "sg", "sh", "so", "sz", "tg", "ti", "ur", "vd", "vs", "zg", "zh"}
}

func getBareme() []string {
	return []string{"A", "B", "C", "D", "E", "F", "G", "H", "L", "M", "N", "P", "Q", "R", "S", "T", "U"}
}

func getNbEnfants() []string {
	return []string{"0", "1", "2", "3", "4", "5"}
}

type ImpotSource struct {
	Canton string
	Bareme string
	Revenu_imposable_fr string
	//Nbr_enfants string
	Impot_fr string
	Impot_pourcent string
}

func main() {
	fmt.Print()
	for _, canton := range getCantons() {
		create_json_file(canton)
	}
}

func create_json_file(canton string) {
	for _, bareme := range getBareme() {

		for _, nbEnfants := range getNbEnfants() {
			textFile := "./Formatter/rawData/tar2021txt/tar21" + canton + ".txt"
			f, err := os.Open(textFile)

			if err != nil {
				log.Fatal(err)
			}

			defer f.Close()

			scanner := bufio.NewScanner(f)

			var impotArray []*ImpotSource

			for scanner.Scan() {
				line := scanner.Text()
				if len(line) >= 60 && line[0:2] == "06" && line[6:7] == bareme && line[7:8] == nbEnfants {
					i := &ImpotSource{
						Canton:              line[4:6],
						Bareme:              line[6:9],
						Revenu_imposable_fr: line[24:31] + "." + line[31:33],
						//Nbr_enfants:         line[43:45],
						Impot_fr:            line[45:52] + "." + line[52:54],
						Impot_pourcent:      line[54:57] + "." + line[57:59],
					}

					impotArray = append(impotArray, i)

				}
			}

			if err := scanner.Err(); err != nil {
				log.Fatal(err)
			}

			if len(impotArray) > 0 {
				jsonArray, err := json.Marshal(impotArray)

				if err != nil {
					log.Fatal(err)
					return
				}

				jsonFile, err := os.Create("./Formatter/jsonData/" + canton + bareme + nbEnfants + ".json")

				if err != nil {
					log.Fatal(err)
				}

				jsonFile.Write(jsonArray)
			}
		}
	}
}
