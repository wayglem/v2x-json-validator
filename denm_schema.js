const denmSchema = 
{
  "type": "object",
  "$id": "#denm",
  "required": [
    "type",
    "origin",
    "version",
    "source_uuid",
    "timestamp",
    "message"
  ],
  "properties": {
    "type": {
      "enum": ["denm"]
    },
    "origin": {
      "type": "string",
      "enum": [
        "self",
        "mec_app"
      ],
      "description": "the entity responsible for this message"
    },
    "version": {
    	"type": "string",
    	"examples": ["0.0.1", "1.0.0"],
    	"description": "json message format version"
    },
    "source_uuid": {
    	"type": "string",
    	"examples": ["UNKNOWN"]
    },
    "timestamp": {
    	"type": "integer",
    	"description": "the timestamp when the message was generated in milliseconds",
    	"examples": [1574778515424],
    	"minimum": 1514764800000,
    	"maximum": 1830297600000
    },
    "message": {
    	"type": "object",
      "required": [
        "protocol_version",
        "station_id",
        "management_container",
        "situation_container"
      ],
      "properties": {
        "protocol_version": {
          "type": "integer", 
          "minimum": 0,
          "maximum": 255,
          "examples": [1]
        },
        "station_id": {
          "type": "integer", 
          "minimum": 0,
          "maximum": 4294967295,
          "examples": [1]
        },
        "management_container": {
          "type": "object",
          "required": [
            "action_id", 
            "detection_time",
            "reference_time",
            "event_position",
            "station_type"
          ],
          "properties": {
            "action_id": {
              "type": "object",
              "required": ["origin_station_id", "sequence_number"],
              "properties": {
                "origin_station_id": {
                  "type": "integer",
                  "description": "identifier of an its station",
                  "minimum": 0,
                  "maximum": 4294967295
                },
                "sequence_number": {
                  "type": "integer",
                  "description": "The sequence number is set each time a new DENM is created. It is used to differentiate from events detected by the same ITS-S.",
                  "minimum": 0,
                  "maximum": 65535
                }
              }
            },
            "detection_time": {
              "type":"integer",
              "description": "Time at which the event is detected by the originating ITS-S. For the DENM repetition, this DE shall remain unchanged.",
              "minimum": 1514764800000,
              "maximum": 1830297600000
            },
            "reference_time": {
              "type": "integer",
              "description": "This DE refers to the time at which a new DENM, an update DENM or a cancellation DENM is generated.",
              "minimum": 1514764800000,
              "maximum": 1830297600000
            },
            "event_position": {
              "type": "object",
              "description": "Geographical position of the detected event.",
              "required": ["latitude", "longitude"],
              "properties": {
                "latitude": {
                  "type": "integer",
                  "description": "latitude in microdegrees",
                  "minimum": -900000000,
                  "maximum": 900000001
                },
                "longitude": {
                  "type": "integer",
                  "description": "longitude in microdegrees",
                  "minimum": -1800000000,
                  "maximum": 1800000001
                }
              }
            },
            "station_type": {
              "description": "unknown(0), pedestrian(1), cyclist(2), moped(3), motorcycle(4), passengerCar(5), bus(6), lightTruck(7), heavyTruck(8), trailer(9), specialVehicles(10), tram(11), roadSideUnit(15)",
              "type": "integer",
              "minimum": 0,
              "maximum": 255
            }
          }
        },
        "situation_container": {
          "type": "object",
          "required": ["event_type"],
          "properties": {
            "event_type": {
              "type": "object",
              "required": ["cause", "subcause"],
              "properties": {
                "cause": {
                  "type": "integer",
                  "description": "reserved (0), trafficCondition (1), accident (2), roadworks (3), impassability (5), adverseWeatherCondition-Adhesion (6), aquaplannning (7), hazardousLocation-SurfaceCondition (9), hazardousLocation-ObstacleOnTheRoad (10), hazardousLocation-AnimalOnTheRoad (11), humanPresenceOnTheRoad (12), wrongWayDriving (14), rescueAndRecoveryWorkInProgress (15), adverseWeatherCondition-ExtremeWeatherCondition (17), adverseWeatherCondition-Visibility (18), adverseWeatherCondition-Precipitation (19), slowVehicle (26), dangerousEndOfQueue (27), vehicleBreakdown (91), postCrash (92), humanProblem (93), stationaryVehicle (94), emergencyVehicleApproaching (95), hazardousLocation-DangerousCurve (96), collisionRisk (97), signalViolation (98), dangerousSituation (99)",
                  "minimum": 0,
                  "maximum": 255
                },
                "subcause": {
                  "type": "integer",
                  "minimum": 0,
                  "maximum": 255
                }
              }
            }
          }
        }
      }
    }
  }
}

/*
    "management_container": {
      "action_id": {
        "origin_station_id": 42,
        "sequence_number": 1
      },
      "detection_time": 1574778515424,
      "reference_time": 1574778515424,
      "event_position": {
        "latitude": 486263556,
        "longitude": 22492123
      },
      "station_type": 5
    },
    "situation_container": {
      "event_type": {
        "cause": 94,
        "subcause": 2
      }
    }
*/