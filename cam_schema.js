camSchema =
    {
        "$id": "#cam",
        // "$schema": "https://json-schema.org/draft/2019-09/schema",
        "type": "object",
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
                    "global_application",
                    "mec_application",
                    "on_board_application",
                ],
                "description": "the entity responsible for this message"
            },
            "version": {
                "type": "string",
                "description": "json message format version",
                "default": "0.2.0",
                "examples": [
                    "0.0.1",
                    "0.2.0",
                    "1.0.0",
                ]
            },
            "source_uuid": {
                "type": "string",
                "examples": ["UNKNOWN"]
            },
            "timestamp": {
                "type": "integer",
                "description": "Unit: millisecond. The timestamp when the message was generated since Unix Epoch (1970/01/01)",
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
                    "high_frequency_container",
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
                    "generation_delta_time": {
                        "type": "integer",
                        "description": "oneMilliSec(1)",
                        "minimum": 0,
                        "maximum": 65535,
                        "examples": [1]
                    },
                    "basic_container": {
                        "type": "object",
                        "required": [
                            "station_type",
                            "reference_position",
                            "confidence",
                        ],
                        "properties": {
                            "station_type": {
                                "description": "unknown(0), pedestrian(1), cyclist(2), moped(3), motorcycle(4), passengerCar(5), bus(6), lightTruck(7), heavyTruck(8), trailer(9), specialVehicles(10), tram(11), roadSideUnit(15)",
                                "type": "integer",
                                "minimum": 0,
                                "maximum": 255
                            },
                            "reference_position": {
                                "type": "object",
                                "required": [
                                    "latitude",
                                    "longitude",
                                    "altitude",
                                ],
                                "properties": {
                                    "latitude": {
                                        "type": "integer",
                                        "description": "Unit: 0,1 microdegree. oneMicrodegreeNorth (10), oneMicrodegreeSouth (-10), unavailable(900000001)",
                                        "minimum": -900000000,
                                        "maximum": 900000001
                                    },
                                    "longitude": {
                                        "type": "integer",
                                        "description": "Unit: 0,1 microdegree. oneMicrodegreeEast (10), oneMicrodegreeWest (-10), unavailable(1800000001)",
                                        "minimum": -1800000000,
                                        "maximum": 1800000001
                                    },
                                    "altitude": {
                                        "type": "integer",
                                        "description": "Unit: 0.01 meter. referenceEllipsoidSurface(0), oneCentimeter(1), unavailable(800001)} (-100000..800001)",
                                        "minimum": -100000,
                                        "maximum": 800001
                                    },
                                },
                            },
                            "confidence": {
                                "type": "object",
                                "required": [
                                    "position_confidence_ellipse",
                                    "altitude",
                                ],
                                "properties": {
                                    "position_confidence_ellipse": {
                                        "type": "object",
                                        "required": [
                                            "semi_major_confidence",
                                            "semi_minor_confidence",
                                            "semi_major_orientation",
                                        ],
                                        "properties": {
                                            "semi_major_confidence": {
                                                "type": "integer",
                                                "description": "oneCentimeter(1), outOfRange(4094), unavailable(4095)",
                                                "minimum": 0,
                                                "maximum": 4095
                                            },
                                            "semi_minor_confidence": {
                                                "type": "integer",
                                                "description": "oneCentimeter(1), outOfRange(4094), unavailable(4095)",
                                                "minimum": 0,
                                                "maximum": 4095
                                            },
                                            "semi_major_orientation": {
                                                "type": "integer",
                                                "description": "wgs84North(0), wgs84East(900), wgs84South(1800), wgs84West(2700), unavailable(3601)",
                                                "minimum": 0,
                                                "maximum": 3601
                                            },
                                        }
                                    },
                                    "altitude": {
                                        "type": "integer",
                                        "description": "alt-000-01 (0), alt-000-02 (1), alt-000-05 (2), alt-000-10 (3), alt-000-20 (4), alt-000-50 (5), alt-001-00 (6), alt-002-00 (7), alt-005-00 (8), alt-010-00 (9), alt-020-00 (10), alt-050-00 (11), alt-100-00 (12), alt-200-00 (13), outOfRange (14), unavailable (15)",
                                        "minimum": 0,
                                        "maximum": 15,
                                    }
                                }
                            },
                        }
                    },
                    "high_frequency_container": {
                        "type": "object",
                        "description": "The basic vehicle container high frequency",
                        "required": [
                            "heading",
                            "speed",
                            "drive_direction",
                            "vehicle_length",
                            "vehicle_width",
                            "longitudinal_acceleration",
                            "curvature",
                            "curvature_calculation_mode",
                            "yaw_rate",
                            "confidence",
                        ],
                        "properties": {
                            "heading": {
                                "type": "integer",
                                "description": "Unit: 0,1 degree. wgs84North(0), wgs84East(900), wgs84South(1800), wgs84West(2700), unavailable(3601)",
                                "minimum": 0,
                                "maximum": 3601
                            },
                            "speed": {
                                "type": "integer",
                                "description": "Unit 0,01 m/s. standstill(0), oneCentimeterPerSec(1), unavailable(16383)",
                                "minimum": 0,
                                "maximum": 16383
                            },
                            "drive_direction": {
                                "type": "integer",
                                "description": "forward (0), backward (1), unavailable (2)",
                                "minimum": 0,
                                "maximum": 2
                            },
                            "vehicle_length": {
                                "type": "integer",
                                "description": "tenCentimeters(1), outOfRange(1022), unavailable(1023)",
                                "minimum": 1,
                                "maximum": 1023
                            },
                            "vehicle_width": {
                                "type": "integer",
                                "description": "tenCentimeters(1), outOfRange(61), unavailable(62)",
                                "minimum": 1,
                                "maximum": 62
                            },
                            "curvature": {
                                "type": "integer",
                                "description": "straight(0), reciprocalOf1MeterRadiusToRight(-30000), reciprocalOf1MeterRadiusToLeft(30000), unavailable(30001)",
                                "minimum": -30000,
                                "maximum": 30001
                            },
                            "curvature_calculation_mode": {
                                "type": "integer",
                                "description": "It describes whether the yaw rate is used to calculate the curvature: yawRateUsed(0), yawRateNotUsed(1), unavailable(2)",
                                "minimum": 0,
                                "maximum": 2
                            },
                            "longitudinal_acceleration": {
                                "description": "unit: 0,1 m/s2. pointOneMeterPerSecSquaredForward(1), pointOneMeterPerSecSquaredBackward(-1), unavailable(161)",
                                "type": "integer",
                                "minimum": -160,
                                "maximum": 161
                            },
                            "yaw_rate": {
                                "type": "integer",
                                "description": "Unit: 0,01 degree/s: straight(0), degSec-000-01ToRight(-1), degSec-000-01ToLeft(1), unavailable(32767)",
                                "minimum": -32766,
                                "maximum": 32767
                            },
                            "acceleration_control": {
                                "type": "string",
                                "description": "Current controlling mechanism for longitudinal movement of the vehicle. Represented as a bit string: brakePedalEngaged (0), gasPedalEngaged (1), emergencyBrakeEngaged (2), collisionWarningEngaged(3), accEngaged(4), cruiseControlEngaged(5), speedLimiterEngaged(6)",
                                "example": ["00000000", "1000000", "0000011"]
                            },
                            "lane_position": {
                                "type": "integer",
                                "description": "offTheRoad(-1), innerHardShoulder(0), innermostDrivingLane(1), secondLaneFromInside(2), outterHardShoulder(14)",
                                "minimum": -1,
                                "maximum": 14
                            },
                            "lateral_acceleration": {
                                "type": "integer",
                                "description": "Unit: 0.1 m/s2. pointOneMeterPerSecSquaredToRight(-1), pointOneMeterPerSecSquaredToLeft(1), unavailable(161)",
                                "minimum": -160,
                                "maximum": 161
                            },
                            "vertical_acceleration": {
                                "type": "integer",
                                "description": "Unit: 0.1 m/s2. pointOneMeterPerSecSquaredUp(1), pointOneMeterPerSecSquaredDown(-1), unavailable(161)",
                                "minimum": -160,
                                "maximum": 161
                            },
                            "confidence": {
                                "type": "object",
                                "required": [
                                    "heading",
                                    "speed",
                                    "vehicle_length",
                                    "yaw_rate",
                                ],
                                "properties": {
                                    "heading": {
                                        "type": "integer",
                                        "description": "equalOrWithinZeroPointOneDegree (1), equalOrWithinOneDegree (10), outOfRange(126), unavailable(127)",
                                        "minimum": 1,
                                        "maximum": 127
                                    },
                                    "speed": {
                                        "type": "integer",
                                        "description": "equalOrWithinOneCentimeterPerSec(1), equalOrWithinOneMeterPerSec(100), outOfRange(126), unavailable(127)",
                                        "minimum": 1,
                                        "maximum": 127
                                    },
                                    "vehicle_length": {
                                        "type": "integer",
                                        "description": "noTrailerPresent(0), trailerPresentWithKnownLength(1), trailerPresentWithUnknownLength(2), trailerPresenceIsUnknown(3), unavailable(4)",
                                        "minimum": 0,
                                        "maximum": 4
                                    },
                                    "yaw_rate": {
                                        "type": "integer",
                                        "description": "degSec-000-01 (0), degSec-000-05 (1), degSec-000-10 (2), degSec-001-00 (3), degSec-005-00 (4), degSec-010-00 (5), degSec-100-00 (6), outOfRange (7), unavailable (8)",
                                        "minimum": 0,
                                        "maximum": 8
                                    },
                                    "longitudinal_acceleration": {
                                        "type": "integer",
                                        "description": "pointOneMeterPerSecSquared(1), outOfRange(101), unavailable(102)",
                                        "minimum": 0,
                                        "maximum": 102
                                    },
                                    "curvature": {
                                        "type": "integer",
                                        "description": "onePerMeter-0-00002 (0), onePerMeter-0-0001 (1), onePerMeter-0-0005 (2), onePerMeter-0-002 (3), onePerMeter-0-01 (4), onePerMeter-0-1 (5), outOfRange (6), unavailable (7)",
                                        "minimum": 0,
                                        "maximum": 7
                                    },
                                    "lateral_acceleration": {
                                        "type": "integer",
                                        "description": "Unit: 0,1 m/s2. pointOneMeterPerSecSquared(1), outOfRange(101), unavailable(102)",
                                        "minimum": 0,
                                        "maximum": 102
                                    },
                                    "vertical_acceleration": {
                                        "type": "integer",
                                        "description": "Unit: 0,1 m/s2. pointOneMeterPerSecSquared(1), outOfRange(101), unavailable(102)",
                                        "minimum": 0,
                                        "maximum": 102
                                    },
                                }
                            }
                        }
                    },
                    "low_frequency_container": {
                        "type": "object",
                        "description": "The basic vehicle container low frequency",
                        "required": [
                            "vehicle_role",
                            "exterior_lights",
                            "path_history",
                        ],
                        "properties": {
                            "vehicle_role": {
                                "type": "integer",
                                "description": "default(0), publicTransport(1), specialTransport(2), dangerousGoods(3), roadWork(4), rescue(5), emergency(6), safetyCar(7), agriculture(8),commercial(9),military(10),roadOperator(11),taxi(12), reserved1(13), reserved2(14), reserved3(15)",
                                "minimum": 0,
                                "maximum": 15
                            },
                            "exterior_lights": {
                                "type": "string",
                                "description": "Status of the exterior light switches represented as a bit string: lowBeamHeadlightsOn (0), highBeamHeadlightsOn (1), leftTurnSignalOn (2), rightTurnSignalOn (3), daytimeRunningLightsOn (4), reverseLightOn (5), fogLightOn (6), parkingLightsOn (7)",
                                "example": [
                                    "00000000",
                                    "10011010",
                                    "00000110",]
                            },
                            "path_history": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "required": [
                                        "path_position",
                                    ],
                                    "properties": {
                                        "path_position": {
                                            "type": "object",
                                            "required": [
                                                "delta_latitude",
                                                "delta_longitude",
                                                "delta_altitude",
                                            ],
                                            "properties": {
                                                "delta_latitude": {
                                                    "type": "integer",
                                                    "description": "oneMicrodegreeNorth (10), oneMicrodegreeSouth (-10) , unavailable(131072)",
                                                    "minimum": -131071,
                                                    "maximum": 131072
                                                },
                                                "delta_longitude": {
                                                    "type": "integer",
                                                    "description": "oneMicrodegreeEast (10), oneMicrodegreeWest (-10), unavailable(131072)",
                                                    "minimum": -131071,
                                                    "maximum": 131072
                                                },
                                                "delta_altitude": {
                                                    "type": "integer",
                                                    "description": "oneCentimeterUp (1), oneCentimeterDown (-1), unavailable(12800)",
                                                    "minimum": -12700,
                                                    "maximum": 12800
                                                },
                                            },
                                        },
                                        "path_delta_time": {
                                            "type": "integer",
                                            "description": "tenMilliSecondsInPast(1)",
                                            "minimum": 1,
                                            "maximum": 65535
                                        },
                                    },
                                }
                            },
                        }
                    }
                }
            }
        }
    };
