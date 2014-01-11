angular.module('ledita-app')
	.controller('LdEditCtrl', ['$scope', '$log', '$routeParams', '$location', '$timeout', 'TypeaheadHelper', 'LDService', 'LDEditService', 'Home', 'ngDialog',
		function($scope, $log, $routeParams, $location, $timeout, TypeaheadHelper, LDService, LDEditService, Home, ngDialog) {

			$scope.ldid = $routeParams.ldid;
			$scope.selectedQcers = {};
			$scope.selectedTopics = [];
			$scope.selectedObjectives = [];
			$scope.selectedPrerequisites = [];

			var initPageData = function() {
				initLd();
				initLdStructure();
			};

			var initLd = function() {
				LDEditService.getLearningDesign($scope.ldid, function(res) {
					LDEditService.setCurrentLdId($scope.ldid);
					$scope.learningDesign = res;
					initLdPublicationFlag();
					initMultiSelections();
					Home.getQcers(function(res) {
						$scope.qceropts = res;
						initSelectedQcers()
					}, function(err) {
						$scope.qcerError = err;
					});
				}, function(err) {
					$location.path('/');
				});
			};

			var initLdStructure = function() {
				LDService.getActivities($scope.ldid, function(res) {
					$scope.levels = res;
				}, function(err) {
					$scope.error = "Failed to fetch learning design activities.";
					$scope.alertMsg = err;
				});
			}

			initPageData();

			$scope.$on('activityCreated', function(event) {
				$timeout(function() {
					initLdStructure();
				}, 10);
			});

			$scope.dropped = function(dragSource, dropTarget) {

				console.log('dropped: dragSource.id = ' + dragSource.id + ', dropTarget.id = ' + dropTarget.id);
				var data = {
					dragSourceId: dragSource.id,
					dropTargetId: dropTarget.id
				};
				LDEditService.updateActivityLevelPosition($scope.ldid, data,

					function(res) {
						$scope.levels = res;

					},
					function(err) {
						$log.error(err);
						$scope.ldUpdateErrors = err; // TODO UI to display these
					}
				);
				$scope.ldUpdateErrors = null;

			};

			initLdPublicationFlag = function() {
				if ($scope.learningDesign.ld_publication === 0) {
					$scope.ldPublicationFlag = false;
				} else {
					$scope.ldPublicationFlag = true;
				}
			};

			initMultiSelections = function() {
				$scope.selectedTopics = LDEditService.extractTopicNames($scope.learningDesign.subjects);
				$scope.selectedObjectives = LDEditService.extractObjectiveNames($scope.learningDesign.objectives);
				$scope.selectedPrerequisites = LDEditService.extractPrerequisiteNames($scope.learningDesign.prerequisites);
			};

			initSelectedQcers = function() {
				$scope.selectedQcers = LDEditService.generateSelectedQcers(
					$scope.learningDesign.qcers, $scope.qceropts);
			};

			$scope.getScopes = function(scope) {
				return TypeaheadHelper.getScopes(scope);
			};

			$scope.getSubjects = function(subject) {
				return TypeaheadHelper.getSubjects(subject);
			};

			$scope.getObjectives = function(objective) {
				return TypeaheadHelper.getObjectives(objective);
			};

			// TODO: Same logic also in HomeController, refactor to common service like ListHelper
			var removeItem = function(item, list) {
				var index = list.indexOf(item);
				if (index > -1) {
					list.splice(index, 1);
				}
			};

			// #28 wip - only add to the selected items list if not already there
			$scope.addTopic = function() {
				$scope.ldUpdateErrors = null;
				LDEditService.addTopic($scope.ldid, {
						topic: $scope.ldTopic
					},
					function(res) {
						$scope.selectedTopics.push($scope.ldTopic);
						$scope.ldTopic = " ";
						$scope.ldUpdateErrors = "Modifica salvata!";
					},
					function(err) {
						$log.error(err);
						$scope.ldUpdateErrors = err; // TODO UI to display these
					}
				);
			};

			$scope.removeTopic = function(topic) {
				$scope.ldUpdateErrors = null;
				LDEditService.removeTopic($scope.ldid, {
						topic: topic
					},
					function(res) {
						removeItem(topic, $scope.selectedTopics);
						$scope.ldUpdateErrors = "Modifica salvata!";
					},
					function(err) {
						$log.error(err);
						$scope.ldUpdateErrors = err; // TODO UI to display these
					}
				);
			};

			// #28 wip - only add to the selected items list if not already there
			$scope.addObjective = function() {
				$scope.ldUpdateErrors = null;
				LDEditService.addObjective($scope.ldid, {
						objective: $scope.ldObjective
					},
					function(res) {
						$scope.selectedObjectives.push($scope.ldObjective);
						$scope.ldObjective = " ";
						$scope.ldUpdateErrors = "Modifica salvata!";
					},
					function(err) {
						$log.error(err);
						$scope.ldUpdateErrors = err; // TODO UI to display these
					});
			};

			$scope.removeObjective = function(objective) {
				$scope.ldUpdateErrors = null;
				LDEditService.removeObjective($scope.ldid, {
						objective: objective
					},
					function(res) {
						removeItem(objective, $scope.selectedObjectives);
						$scope.ldUpdateErrors = "Modifica salvata!";
					},
					function(err) {
						$log.error(err);
						$scope.ldUpdateErrors = err; // TODO UI to display these
					}
				);
			};

			// #28 wip - only add to the selected items list if not already there
			$scope.addPrerequisite = function() {
				$scope.ldUpdateErrors = null;
				LDEditService.addPrerequisite($scope.ldid, {
						prerequisite: $scope.ldRequisite
					},
					function(res) {
						$scope.selectedPrerequisites.push($scope.ldRequisite);
						$scope.ldRequisite = " ";
						$scope.ldUpdateErrors = "Modifica salvata!";
					},
					function(err) {
						$log.error(err);
						$scope.ldUpdateErrors = err; // TODO UI to display these
					});
			};

			$scope.removePrerequisite = function(prerequisite) {
				$scope.ldUpdateErrors = null;
				LDEditService.removePrerequisite($scope.ldid, {
						prerequisite: prerequisite
					},
					function(res) {
						removeItem(prerequisite, $scope.selectedPrerequisites);
						$scope.ldUpdateErrors = "Modifica salvata!";
					},
					function(err) {
						$log.error(err);
						$scope.ldUpdateErrors = err; // TODO UI to display these
					}
				);
			};

			// TODO: client-side validation: if all are false, display error instead of calling service
			$scope.updateQcer = function() {
				$scope.ldUpdateErrors = null;
				LDEditService.updateLdQcers($scope.ldid, {
						ldQcers: $scope.selectedQcers
					},
					function(res) {
						$log.info('updateQcer successful');
						$scope.ldUpdateErrors = "Modifica salvata!";
					},
					function(err) {
						$log.error(err);
						$scope.ldUpdateErrors = err; // TODO UI to display these
					});
			};

			$scope.updateLdName = function() {
				$scope.ldUpdateErrors = null;
				var modifiedLdName = $scope.learningDesign.ld_name;
				if (modifiedLdName && modifiedLdName.length > 0) {
					LDEditService.updateLdName($scope.ldid, {
							ldName: modifiedLdName
						},
						function(res) {
							$log.info('updateLdName successful');
							$scope.ldUpdateErrors = "Modifica salvata!";
						},
						function(err) {
							$log.error(err);
							$scope.ldUpdateErrors = err; // TODO UI to display these
						});
				};
			};

			$scope.updateLdScope = function() {
				$scope.ldUpdateErrors = null;
				var modifiedLdScope = $scope.learningDesign.ld_scope;
				if (modifiedLdScope && modifiedLdScope.length > 0) {
					LDEditService.updateLdScope($scope.ldid, {
							ldScope: modifiedLdScope
						},
						function(res) {
							$log.info('updateLdScope successful');
							$scope.ldUpdateErrors = "Modifica salvata!";
						},
						function(err) {
							$log.error(err);
							$scope.ldUpdateErrors = err; // TODO UI to display these
						});
				};
			};

			$scope.updateStudentsDescr = function() {
				$scope.ldUpdateErrors = null;
				var modifiedStudentsDescr = $scope.learningDesign.ld_students_profile;
				if (modifiedStudentsDescr && modifiedStudentsDescr.length > 0) {
					LDEditService.updateStudentsDescr($scope.ldid, {
							studentsDescr: modifiedStudentsDescr
						},
						function(res) {
							$log.info('updateStudentsDescr successful');
							$scope.ldUpdateErrors = "Modifica salvata!";
						},
						function(err) {
							$log.error(err);
							$scope.ldUpdateErrors = err; // TODO UI to display these
						});
				};
			};

			$scope.updateLdPublication = function() {
				$scope.ldUpdateErrors = null;
				if ($scope.ldPublicationFlag) {
					LDEditService.updateLdPublic($scope.ldid,
						function(res) {
							$scope.ldUpdateErrors = "Modifica salvata!";
						},
						function(err) {
							$scope.ldUpdateErrors = err; // TODO UI to display these
						});
				} else {
					LDEditService.updateLdPrivate($scope.ldid,
						function(res) {
							$log.info('updateLdPublication successful');
							$scope.ldUpdateErrors = "Modifica salvata!";
						},
						function(err) {
							$log.error(err);
							$scope.ldUpdateErrors = err; // TODO UI to display these
						});
				}

			};

			$scope.getBoxClass = function(node) {
				return LDService.getBoxClass(node);
			};

			$scope.getGroupBoxClass = function(node) {
				return LDService.getGroupBoxClass(node);
			};

			$scope.isBtnActive = function(data) {
				if (data == true)
					return "btnActive";
			};

			$scope.open = function(node) {
				$scope.shouldBeOpen = true;
				var selectedNode;
				$scope.selectedNode = node;
				$scope.selectedNode.displayName = node.node_name || node.group_child_name;
				return selectedNode;
			};

			$scope.close = function() {
				$scope.closeMsg = 'I was closed at: ' + new Date();
				$scope.shouldBeOpen = false;
			};

			$scope.opts = {
				backdropFade: true,
				dialogFade: true
			};

			$scope.createActivity = function(node) {
				$scope.addActivity = true;
			};

			$scope.closeAddActivity = function() {
				$scope.closeMsg = 'I was closed at: ' + new Date();
				$scope.addActivity = false;
			};

			$scope.$on('closeActivityModal', function(event) {
				$timeout(function() {
					$scope.closeAddActivity();
				}, 10);
			});

			$scope.optsAddActivity = {
				backdropFade: true,
				dialogFade: true,
				backdropClick: false
			};

			$scope.createGroup = function(node) {
				$scope.addGroup = true;
			};

			$scope.closeAddGroup = function() {
				$scope.closeMsg = 'I was closed at: ' + new Date();
				$scope.addGroup = false;
			};

			$scope.optsAddGroup = {
				backdropFade: true,
				dialogFade: true,
				backdropClick: false
			};

			$scope.addingLD = function(node) {
				$scope.addLD = true;
			};

			$scope.closeAddLD = function() {
				$scope.closeMsg = 'I was closed at: ' + new Date();
				$scope.addLD = false;
			};

			$scope.optsAddLD = {
				backdropFade: true,
				dialogFade: true,
				backdropClick: false
			};

			$scope.createResource = function(node) {
				$scope.addResource = true;
			};

			$scope.closeAddResource = function() {
				$scope.closeMsg = 'I was closed at: ' + new Date();
				$scope.addResource = false;
				$scope.addActivity = true;
			};

			$scope.optsAddResource = {
				backdropFade: true,
				dialogFade: true,
				backdropClick: false
			};

			$scope.$on('closeResourceModal', function(event) {
				$timeout(function() {
					$scope.closeAddResource();
				}, 10);
			});

			$scope.getBoxEditClass = function(node) {
				return LDEditService.getBoxEditClass(node);
			};
			$scope.getGroupEditBoxClass = function(node) {
				return LDEditService.getGroupEditBoxClass(node);
			};

			// #57 wip
			$scope.removeNode = function(node) {
				$scope.nodeConfirm = node;
				ngDialog.open({
					template: 'removeNodeConfirm',
					className: 'ngdialog-theme-default',
					controller: 'LdEditCtrl',
					scope: $scope
				});
			};

			$scope.cancelDeleteNode = function() {
				$log.info('cancelDeleteNode');
				ngDialog.close();
			};

			$scope.okDeleteNode = function(confirmNode) {
				ngDialog.close();
				if (confirmNode.type === 'ACTIVITY') {
					handleDeleteActivity(confirmNode.ld_id, confirmNode.node_id);
				};
				if (confirmNode.type === 'LD') {
					$log.warn('Delete child LD not supported yet.');
				}
			};

			var handleDeleteActivity = function(ldId, activityId) {
				LDEditService.deleteActivity(ldId, activityId,
					function(res) {
						// FIXME ngDialog.close might be interfering so this never gets displayed
						$scope.ldUpdateErrors = "Modifica salvata!";
					},
					function(err) {
						$log.error(err);
						$scope.ldUpdateErrors = err; // TODO UI to display these
					});
			};

		}
	]);