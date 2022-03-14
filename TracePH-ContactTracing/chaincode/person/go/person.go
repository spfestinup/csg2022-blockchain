/*
SPDX-License-Identifier: Apache-2.0
*/

package main

import (
	"encoding/json"
	"fmt"

	// "strconv"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// SmartContract provides functions for managing a person
type SmartContract struct {
	contractapi.Contract
}

// Person describes basic details of what makes up a person
type Person struct {
	FirstName     string `json:"firstName"`
	LastName      string `json:"lastName"`
	Address       string `json:"address"`
	Barangay      string `json:"barangay"`
	ContactNumber string `json:"contactNumber"`
	Email         string `json:"email"`
}

// QueryResult structure used for handling result of query
type QueryResult struct {
	Id     string `json:"Id"`
	Record *Person
}

// InitLedger adds a base set of persons to the ledger
func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	return nil
}

//
// CREATE
//

// CreatePerson adds a new person to the world state with given details
func (s *SmartContract) CreatePerson(ctx contractapi.TransactionContextInterface, userID string, firstName string, lastName string, address string, barangay string, contactNumber string, email string) error {
	person := Person{
		FirstName:     firstName,
		LastName:      lastName,
		Address:       address,
		Barangay:      barangay,
		ContactNumber: contactNumber,
		Email:         email,
	}

	personAsBytes, _ := json.Marshal(person)

	return ctx.GetStub().PutState(userID, personAsBytes)
}

//
// READ
//

// QueryPerson returns the person stored in the world state with given id
func (s *SmartContract) QueryPerson(ctx contractapi.TransactionContextInterface, userID string) (*Person, error) {
	personAsBytes, err := ctx.GetStub().GetState(userID)

	if err != nil {
		return nil, fmt.Errorf("Failed to read from world state. %s", err.Error())
	}

	if personAsBytes == nil {
		return nil, fmt.Errorf("%s does not exist", userID)
	}

	person := new(Person)
	_ = json.Unmarshal(personAsBytes, person)

	return person, nil
}

// QueryAllPersons returns all persons found in world state
func (s *SmartContract) QueryAllPersons(ctx contractapi.TransactionContextInterface) ([]QueryResult, error) {
	startId := ""
	endId := ""

	resultsIterator, err := ctx.GetStub().GetStateByRange(startId, endId)

	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	results := []QueryResult{}

	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()

		if err != nil {
			return nil, err
		}

		person := new(Person)
		_ = json.Unmarshal(queryResponse.Value, person)

		queryResult := QueryResult{Id: queryResponse.Key, Record: person}
		results = append(results, queryResult)
	}

	return results, nil
}

//
// UPDATE
//

// ChangePersonFirstName updates the first name field of person with given id in world state
func (s *SmartContract) ChangePersonFirstName(ctx contractapi.TransactionContextInterface, userID string, newFirstName string) error {
	person, err := s.QueryPerson(ctx, userID)

	if err != nil {
		return err
	}

	person.FirstName = newFirstName

	personAsBytes, _ := json.Marshal(person)

	return ctx.GetStub().PutState(userID, personAsBytes)
}

// ChangePersonLastName updates the first name field of person with given id in world state
func (s *SmartContract) ChangePersonLastName(ctx contractapi.TransactionContextInterface, userID string, newLastName string) error {
	person, err := s.QueryPerson(ctx, userID)

	if err != nil {
		return err
	}

	person.LastName = newLastName

	personAsBytes, _ := json.Marshal(person)

	return ctx.GetStub().PutState(userID, personAsBytes)
}

// ChangePersonAddress updates the first name field of person with given id in world state
func (s *SmartContract) ChangePersonAddress(ctx contractapi.TransactionContextInterface, userID string, newAddress string) error {
	person, err := s.QueryPerson(ctx, userID)

	if err != nil {
		return err
	}

	person.Address = newAddress

	personAsBytes, _ := json.Marshal(person)

	return ctx.GetStub().PutState(userID, personAsBytes)
}

// ChangePersonBarangay updates the first name field of person with given id in world state
func (s *SmartContract) ChangePersonBarangay(ctx contractapi.TransactionContextInterface, userID string, newBarangay string) error {
	person, err := s.QueryPerson(ctx, userID)

	if err != nil {
		return err
	}

	person.Barangay = newBarangay

	personAsBytes, _ := json.Marshal(person)

	return ctx.GetStub().PutState(userID, personAsBytes)
}

// ChangePersonContactNumber updates the first name field of person with given id in world state
func (s *SmartContract) ChangePersonContactNumber(ctx contractapi.TransactionContextInterface, userID string, newContactNumber string) error {
	person, err := s.QueryPerson(ctx, userID)

	if err != nil {
		return err
	}

	person.ContactNumber = newContactNumber

	personAsBytes, _ := json.Marshal(person)

	return ctx.GetStub().PutState(userID, personAsBytes)
}

// ChangePersonEmail updates the first name field of person with given id in world state
func (s *SmartContract) ChangePersonEmail(ctx contractapi.TransactionContextInterface, userID string, newEmail string) error {
	person, err := s.QueryPerson(ctx, userID)

	if err != nil {
		return err
	}

	person.Email = newEmail

	personAsBytes, _ := json.Marshal(person)

	return ctx.GetStub().PutState(userID, personAsBytes)
}
