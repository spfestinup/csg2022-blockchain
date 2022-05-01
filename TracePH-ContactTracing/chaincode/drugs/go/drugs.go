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
type User struct {
	UserId   string `json:"userId"`
	Location string `json:"location"`
	Phone    string `json:"phone"`
	Email    string `json:"email"`
}

// QueryResult structure used for handling result of query
type QueryResult struct {
	Id     string `json:"Id"`
	Record *User
}

// InitLedger adds a base set of cars to the ledger
func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	users := []User{
		{UserId: "93b9c9c1-258b-48ee-9810-3acc49850b4b", Location: "Baclaran", Phone: "09123456789", Email: "testemail@gmail.com"},
		{UserId: "1a25bd3e-8c8e-4a56-a2fe-559fc958168b", Location: "Quezon City", Phone: "090987654321", Email: "testemail2@hotmail.com"},
	}

	for i, user := range users {
		userAsBytes, _ := json.Marshal(user)
		err := ctx.GetStub().PutState(strconv.Itoa(i), userAsBytes)

		if err != nil {
			return fmt.Errorf("Failed to put to world state. %s", err.Error())
		}
	}

	return nil
}

// CreateCar adds a new car to the world state with given details
func (s *SmartContract) CreateUser(ctx contractapi.TransactionContextInterface, userId string, location string, phone string, email string) error {
	user := User{
		UserId:   userId,
		Location: location,
		Phone:    phone,
		Email:    email,
	}

	userAsBytes, _ := json.Marshal(user)

	return ctx.GetStub().PutState(userId, userAsBytes)
}

// QueryCar returns the car stored in the world state with given id
func (s *SmartContract) QueryUser(ctx contractapi.TransactionContextInterface, userId string) (*User, error) {
	userAsBytes, err := ctx.GetStub().GetState(userId)

	if err != nil {
		return nil, fmt.Errorf("Failed to read from world state. %s", err.Error())
	}

	if userAsBytes == nil {
		return nil, fmt.Errorf("%s does not exist", userId)
	}

	user := new(User)
	_ = json.Unmarshal(userAsBytes, user)

	return user, nil
}

// QueryAllCars returns all cars found in world state
func (s *SmartContract) QueryAllUsers(ctx contractapi.TransactionContextInterface) ([]QueryResult, error) {
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

		user := new(User)
		_ = json.Unmarshal(queryResponse.Value, user)

		queryResult := QueryResult{Id: queryResponse.Key, Record: user}
		results = append(results, queryResult)
	}

	return results, nil
}

// ChangeCarOwner updates the owner field of car with given id in world state
func (s *SmartContract) ChangeUserLocation(ctx contractapi.TransactionContextInterface, userId string, newLocation string) error {
	user, err := s.QueryUser(ctx, userId)

	if err != nil {
		return err
	}

	user.Location = newLocation

	userAsBytes, _ := json.Marshal(user)

	return ctx.GetStub().PutState(userId, userAsBytes)
}

func (s *SmartContract) ChangeUserPhone(ctx contractapi.TransactionContextInterface, userId string, newPhone string) error {
	user, err := s.QueryUser(ctx, userId)

	if err != nil {
		return err
	}

	user.Phone = newPhone

	userAsBytes, _ := json.Marshal(user)

	return ctx.GetStub().PutState(userId, userAsBytes)
}

func (s *SmartContract) ChangeUserEmail(ctx contractapi.TransactionContextInterface, userId string, newEmail string) error {
	user, err := s.QueryUser(ctx, userId)

	if err != nil {
		return err
	}

	user.Email = newEmail

	userAsBytes, _ := json.Marshal(user)

	return ctx.GetStub().PutState(userId, userAsBytes)
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
