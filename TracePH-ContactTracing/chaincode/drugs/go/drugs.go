/*
SPDX-License-Identifier: Apache-2.0
*/

package main

import (
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// SmartContract provides functions for managing a car
type SmartContract struct {
	contractapi.Contract
}

// Car describes basic details of what makes up a car
type Contact struct {
	Timestamp string `json:"timestamp"`
	UserId1   string `json:"userId1"`
	UserId2   string `json:"userId2"`
}

// QueryResult structure used for handling result of query
type QueryResult struct {
	Id     string `json:"Id"`
	Record *Contact
}

// InitLedger adds a base set of cars to the ledger
func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	contacts := []Contact{
		{Timestamp: "2022-01-24T08:04:05.000Z", UserId1: "93b9c9c1-258b-48ee-9810-3acc49850b4b", UserId2: "878873e3-cbc5-4f35-838c-e3d01e182f13"},
		{Timestamp: "2022-02-13T10:45:28.000Z", UserId1: "1a25bd3e-8c8e-4a56-a2fe-559fc958168b", UserId2: "eba476aa-348f-46c0-8c45-368039c4b015"},
	}

	for i, contact := range contacts {
		contactAsBytes, _ := json.Marshal(contact)
		err := ctx.GetStub().PutState(strconv.Itoa(i), contactAsBytes)

		if err != nil {
			return fmt.Errorf("Failed to put to world state. %s", err.Error())
		}
	}

	return nil
}

// CreateCar adds a new car to the world state with given details
func (s *SmartContract) CreateContact(ctx contractapi.TransactionContextInterface, contactId string, timestamp string, userId1 string, userId2 string) error {
	contact := Contact{
		Timestamp: timestamp,
		UserId1:   userId1,
		UserId2:   userId2,
	}

	contactAsBytes, _ := json.Marshal(contact)

	return ctx.GetStub().PutState(contactId, contactAsBytes)
}

// QueryCar returns the car stored in the world state with given id
func (s *SmartContract) QueryContact(ctx contractapi.TransactionContextInterface, contactId string) (*Contact, error) {
	contactAsBytes, err := ctx.GetStub().GetState(contactId)

	if err != nil {
		return nil, fmt.Errorf("Failed to read from world state. %s", err.Error())
	}

	if contactAsBytes == nil {
		return nil, fmt.Errorf("%s does not exist", contactId)
	}

	contact := new(Contact)
	_ = json.Unmarshal(contactAsBytes, contact)

	return contact, nil
}

// QueryAllCars returns all cars found in world state
func (s *SmartContract) QueryAllContacts(ctx contractapi.TransactionContextInterface) ([]QueryResult, error) {
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

		contact := new(Contact)
		_ = json.Unmarshal(queryResponse.Value, contact)

		queryResult := QueryResult{Id: queryResponse.Key, Record: contact}
		results = append(results, queryResult)
	}

	return results, nil
}

// ChangeCarOwner updates the owner field of car with given id in world state
func (s *SmartContract) ChangeContactTimestamp(ctx contractapi.TransactionContextInterface, contactId string, newTimestamp string) error {
	contact, err := s.QueryContact(ctx, contactId)

	if err != nil {
		return err
	}

	contact.Timestamp = newTimestamp

	contactAsBytes, _ := json.Marshal(contact)

	return ctx.GetStub().PutState(contactId, contactAsBytes)
}

func (s *SmartContract) ChangeContactUserId1(ctx contractapi.TransactionContextInterface, contactId string, newUserId string) error {
	contact, err := s.QueryContact(ctx, contactId)

	if err != nil {
		return err
	}

	contact.UserId1 = newUserId

	contactAsBytes, _ := json.Marshal(contact)

	return ctx.GetStub().PutState(contactId, contactAsBytes)
}

func (s *SmartContract) ChangeContactUserId2(ctx contractapi.TransactionContextInterface, contactId string, newUserId string) error {
	contact, err := s.QueryContact(ctx, contactId)

	if err != nil {
		return err
	}

	contact.UserId2 = newUserId

	contactAsBytes, _ := json.Marshal(contact)

	return ctx.GetStub().PutState(contactId, contactAsBytes)
}

func main() {

	chaincode, err := contractapi.NewChaincode(new(SmartContract))

	if err != nil {
		fmt.Printf("Error create fabcar chaincode: %s", err.Error())
		return
	}

	if err := chaincode.Start(); err != nil {
		fmt.Printf("Error starting fabcar chaincode: %s", err.Error())
	}
}
