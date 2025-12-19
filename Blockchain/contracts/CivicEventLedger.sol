// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract CivicEventLedger {

    address public owner;
    uint256 public eventCount;

    constructor() {
        owner = msg.sender;
    }

    struct CivicEvent {
        uint256 eventId;
        string eventType;
        address issuer;
        uint256 timestamp;
        bytes32 dataHash;
        bool verified;
    }

    mapping(uint256 => CivicEvent) private events;

    event EventCreated(
        uint256 indexed eventId,
        string eventType,
        address indexed issuer,
        uint256 timestamp,
        bytes32 dataHash
    );

    event EventVerified(
        uint256 indexed eventId,
        address indexed verifier
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    // Create a new civic event
    function createEvent(
        string calldata _eventType,
        bytes32 _dataHash
    ) external onlyOwner {

        eventCount++;

        events[eventCount] = CivicEvent({
            eventId: eventCount,
            eventType: _eventType,
            issuer: msg.sender,
            timestamp: block.timestamp,
            dataHash: _dataHash,
            verified: false
        });

        emit EventCreated(
            eventCount,
            _eventType,
            msg.sender,
            block.timestamp,
            _dataHash
        );
    }

    // Verify an event (cannot be undone)
    function verifyEvent(uint256 _eventId) external onlyOwner {
        require(_eventId > 0 && _eventId <= eventCount, "Invalid event");
        require(!events[_eventId].verified, "Already verified");

        events[_eventId].verified = true;

        emit EventVerified(_eventId, msg.sender);
    }

    // Public read-only access
    function getEvent(uint256 _eventId)
        external
        view
        returns (
            uint256,
            string memory,
            address,
            uint256,
            bytes32,
            bool
        )
    {
        require(_eventId > 0 && _eventId <= eventCount, "Invalid event");

        CivicEvent memory e = events[_eventId];
        return (
            e.eventId,
            e.eventType,
            e.issuer,
            e.timestamp,
            e.dataHash,
            e.verified
        );
    }
}
