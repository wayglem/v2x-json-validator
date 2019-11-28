camSchema = 
{
  "type": "object",
  "$id": "#cam",
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
      "enum": ["cam"]
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
        "generation_delta",
        "basic_container",
        "high_freq_container",
        "low_freq_container"
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
        "generation_delta": {
          "type": "integer", 
          "description": "in milliseconds",
          "minimum": 0,
          "maximum": 65535,
          "examples": [1]
        },
        "basic_container": {
          "type": "object",
          "required": ["station_type", "position"],
          "properties": {
            "station_type": {
              "description": "unknown(0), pedestrian(1), cyclist(2), moped(3), motorcycle(4), passengerCar(5), bus(6), lightTruck(7), heavyTruck(8), trailer(9), specialVehicles(10), tram(11), roadSideUnit(15)",
              "type": "integer",
              "minimum": 0,
              "maximum": 255
            },
            "position": {
              "type": "object",
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
            }
          }
        },
        "high_freq_container": {
          "type": "object",
          "required": ["heading", "speed", "longitudinal_acceleration", "yaw_rate"],
          "properties": {
            "heading": {
              "type": "integer",
              "description": "heading clockwise in 1/100 of degrees",
              "minimum": 0,
              "maximum": 3601
            },
            "speed": {
              "type": "integer",
              "description": "in centimeter per second",
              "minimum": 0,
              "maximum": 16383
            },
            "longitudinal_acceleration": {
              "description": "in 0.1 meter per second squared",
              "type": "integer",
              "minimum": -160,
              "maximum": 161
            },
            "yaw_rate": {
              "type": "integer",
              "minimum": -32766,
              "maximum": 32767
            }
          }
        },
        "low_freq_container": {
          "type": "object",
          "required": ["vehicle_role"],
          "properties": {
            "vehicle_role": {
              "type": "integer",
              "minimum": 0,
              "maximum": 15,
              "description": "default(0), publicTransport(1), specialTransport(2), dangerousGoods(3), roadWork(4), rescue(5), emergency(6), safetyCar(7), agriculture(8),commercial(9),military(10),roadOperator(11),taxi(12), reserved1(13), reserved2(14), reserved3(15)"
            }
          }
        }
      }
    }
  }
};
