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
type Query struct {
	Timestamp string `json:"timestamp"`
	UserId    string `json:"userId"`
}

// QueryResult structure used for handling result of query
type QueryResult struct {
	Id     string `json:"Id"`
	Record *Query
}

// InitLedger adds a base set of cars to the ledger
func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	queries := []Query{
		{Timestamp: "2022-01-27T21:01:31Z", UserId: "3d030450-84a7-4033-980b-714c491a42b4"},
		{Timestamp: "2022-03-19T16:38:05Z", UserId: "45641061-6e29-4a0c-806b-c9e4cade47c1"},
	}

	for i, query := range queries {
		queryAsBytes, _ := json.Marshal(query)
		err := ctx.GetStub().PutState(strconv.Itoa(i), queryAsBytes)

		if err != nil {
			return fmt.Errorf("Failed to put to world state. %s", err.Error())
		}
	}

	return nil
}

// CreateCar adds a new car to the world state with given details
func (s *SmartContract) CreateQuery(ctx contractapi.TransactionContextInterface, queryId string, timestamp string, userId string) error {
	query := Query{
		Timestamp: timestamp,
		UserId:    userId,
	}

	queryAsBytes, _ := json.Marshal(query)

	return ctx.GetStub().PutState(queryId, queryAsBytes)
}

// QueryCar returns the car stored in the world state with given id
func (s *SmartContract) ReadQuery(ctx contractapi.TransactionContextInterface, queryId string) (*Query, error) {
	queryAsBytes, err := ctx.GetStub().GetState(queryId)

	if err != nil {
		return nil, fmt.Errorf("Failed to read from world state. %s", err.Error())
	}

	if queryAsBytes == nil {
		return nil, fmt.Errorf("%s does not exist", queryId)
	}

	query := new(Query)
	_ = json.Unmarshal(queryAsBytes, query)

	return query, nil
}

// QueryAllCars returns all cars found in world state
func (s *SmartContract) ReadQueries(ctx contractapi.TransactionContextInterface) ([]QueryResult, error) {
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

		query := new(Query)
		_ = json.Unmarshal(queryResponse.Value, query)

		queryResult := QueryResult{Id: queryResponse.Key, Record: query}
		results = append(results, queryResult)
	}

	return results, nil
}

// ChangeCarOwner updates the owner field of car with given id in world state
func (s *SmartContract) UpdateQueryTimestamp(ctx contractapi.TransactionContextInterface, queryId string, newTimestamp string) error {
	query, err := s.ReadQuery(ctx, queryId)

	if err != nil {
		return err
	}

	query.Timestamp = newTimestamp

	queryAsBytes, _ := json.Marshal(query)

	return ctx.GetStub().PutState(queryId, queryAsBytes)
}

func (s *SmartContract) UpdateQueryUserId(ctx contractapi.TransactionContextInterface, queryId string, newUserId string) error {
	query, err := s.ReadQuery(ctx, queryId)

	if err != nil {
		return err
	}

	query.UserId = newUserId

	queryAsBytes, _ := json.Marshal(query)

	return ctx.GetStub().PutState(queryId, queryAsBytes)
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
