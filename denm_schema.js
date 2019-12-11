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
                    "mec_app",
                    "onbaord-sensor",
                    "backend"
                ],
                "description": "the entity responsible for this message"
            },
            "version": {
                "type": "string",
                "examples": ["0.1.0", "1.0.0"],
                "description": "json message format version"
            },
            "source_uuid": {
                "type": "string",
                "examples": [
                    "UNKNOWN",
                    "CCU6",
                    "MEC2"
                ]
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
                                "required": [
                                    "origin_station_id", 
                                    "sequence_number"
                                ],
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
                                "type": "integer",
                                "description": "Unit: millisecond since ETSI epoch (2004/01/01). Time at which the event is detected by the originating ITS-S. For the DENM repetition, this DE shall remain unchanged.",
                                "minimum": 126230400000,
                                "maximum": 441763200000
                            },
                            "reference_time": {
                                "type": "integer",
                                "description": "Unit: millisecond since ETSI epoch (2004/01/01). Time at which a new DENM, an update DENM or a cancellation DENM is generated.",
                                "minimum": 126230400000,
                                "maximum": 441763200000
                            },
                            "termination": {
                                "type": "integer",
                                "description": "isCancellation(0), isNegation (1)",
                                "minimum": 0,
                                "maximum": 1
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
                                    },
                                    "altitude": {
                                        "type": "integer",
                                        "description": "Unit: 0.01 meter. referenceEllipsoidSurface(0), oneCentimeter(1), unavailable(800001)} (-100000..800001)",
                                        "minimum": -100000,
                                        "maximum": 800001
                                    },
                                    "confidence": {
                                        "type": "object",
                                        "properties": {
                                            "semi_major_confidence": {
                                                "type": "integer",
                                                "description": "Unit: cm. oneCentimeter(1), outOfRange(4094), unavailable(4095)",
                                                "minimum": 0,
                                                "maximum": 4095
                                            },
                                            "semi_minor_confidence": {
                                                "type": "integer",
                                                "description": "Unit: cm. oneCentimeter(1), outOfRange(4094), unavailable(4095)",
                                                "minimum": 0,
                                                "maximum": 4095
                                            },
                                            "semi_major_orientation": {
                                                "type": "integer",
                                                "description": "Unit 0.1 degree. wgs84North(0), wgs84East(900), wgs84South(1800), wgs84West(2700), unavailable(3601)",
                                                "minimum": 0,
                                                "maximum": 3601
                                            },
                                            "altitude": {
                                                "type": "integer",
                                                "description": "Absolute accuracy of a reported altitude value of a geographical point for a predefined confidence level (e.g. 95 %).",
                                                "minimum": 0,
                                                "maximum": 15
                                            }
                                        }
                                    }
                                }
                            },
                            "relevant_distance": {
                                "type": "integer",
                                "description": "lessThan50m(0), lessThan100m(1), lessThan200m(2), lessThan500m(3), lessThan1000m(4), lessThan5km(5), lessThan10km(6), over10km(7)",
                                "minimum": 0,
                                "maximum": 7
                            },
                            "relevance_traffic_direction": {
                                "type": "integer",
                                "description": "allTrafficDirections(0), upstreamTraffic(1), downstreamTraffic(2), oppositeTraffic(3)",
                                "minimum": 0,
                                "maximum": 3
                            },
                            "validity_duration": {
                                "type": "integer",
                                "description": "Unit: second. timeOfDetection(0), oneSecondAfterDetection(1)",
                                "minimum": 0,
                                "maximum": 86400
                            },
                            "transmission_interval": {
                                "type": "integer",
                                "description": "Unit: millisecond. oneMilliSecond(1), tenSeconds(10000)",
                                "minimum": 1,
                                "maximum": 10000
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
                            "information_quality": {
                                "type": "integer",
                                "description": "unavailable(0), lowest(1), highest(7)",
                                "minimum": 0,
                                "maximum": 7
                            },
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
                            },
                            "linked_cause": {
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
                    },
                    "location_container": {
                        "type": "object",
                        "properties": {
                            "event_speed": {
                                "type": "integer",
                                "description": "Unit 0,01 m/s. standstill(0), oneCentimeterPerSec(1), unavailable(16383)",
                                "minimum": 0,
                                "maximum": 16383
                            },
                            "event_position_heading": {
                                "type": "integer",
                                "description": "Unit: 0,1 degree. wgs84North(0), wgs84East(900), wgs84South(1800), wgs84West(2700), unavailable(3601)",
                                "minimum": 0,
                                "maximum": 3601
                            },
                            "road_type": {
                                "type": "integer",
                                "description": "Type of a road segment. urban-NoStructuralSeparationToOppositeLanes(0), urban-WithStructuralSeparationToOppositeLanes(1), nonUrban-NoStructuralSeparationToOppositeLanes(2), nonUrban-WithStructuralSeparationToOppositeLanes(3)",
                                "minimum": 0,
                                "maximum": 3
                            },
                            "confidence": {
                                "type": "object",
                                "properties": {
                                    "event_speed": {
                                        "type": "integer",
                                        "description": "Unit: 0.01 m/s. equalOrWithinOneCentimeterPerSec(1), equalOrWithinOneMeterPerSec(100), outOfRange(126), unavailable(127)",
                                        "minimum": 1,
                                        "maximum": 127
                                    },
                                    "event_position_heading": {
                                        "type": "integer",
                                        "description": "Unit: 0,1 degree. equalOrWithinZeroPointOneDegree (1), equalOrWithinOneDegree (10), outOfRange(126), unavailable(127)",
                                        "minimum": 1,
                                        "maximum": 127
                                    }
                                }
                            }
                        }
                    },
                    "alacarte_container": {
                        "type": "object",
                        "properties": {
                            "lane_position": {
                                "type": "integer",
                                "description": "offTheRoad(-1), innerHardShoulder(0), innermostDrivingLane(1), secondLaneFromInside(2), outterHardShoulder(14)",
                                "minimum": -1,
                                "maximum": 14
                            },
                            "position_solution_type": {
                                "type": "integer",
                                "description": "noPositioningSolution(0), sGNSS(1), dGNSS(2), sGNSSplusDR(3), dGNSSplusDR(4), dR(5), ...",
                                "minimum": 0,
                                "maximum": 5
                            }
                        }
                    }
                }
            }
        }
    };
