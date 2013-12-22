var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');
var studentsService = require('../../../server/service/StudentsService');
var activityCreateDao = require('../../../server/dao/ActivityCreateDao');
var composesService = require('../../../server/service/ComposesService');
var technologyService = require('../../../server/service/TechnologyService');
var resourceService = require('../../../server/service/ResourceService');
var fixture = require('../../../server/service/ActivityCreateService');

describe('Activity Create Service', function() {

	var sandbox = sinon.sandbox.create();
	var activityData = {
			"actName" : "Activity Name",
			"modality" : "2",
			"dur_mon" : 1,																
			"dur_d" : 2,																	
			"dur_h" : 3,																	
			"dur_min" : 4,																
			"org" : "4",																	
			"group_number" : 5,														
			"people_per_group" : 6,												
			"technologies" : ["Whiteboard", "Touch Screen"],
			"pract_descr" : "long description",						
			"edu_descr" : "pedagogical long description",
			"resources":[
				{"name":"res1","type":"restype1","descr":"res descr 1","link":"http://res.1"},
				{"name":"res2","type":"restype2","descr":"res 2 description","link":"http://res.2"}
			]	
		};

  beforeEach(function() {
  });

  afterEach(function() {
      sandbox.restore();
  });

  it('Creates activity and all related entities successfully', function(done) {
  	var ldId = 1;
  	
  	var insertedStudentsId = 101;
  	var studentsServiceStub = sandbox.stub(studentsService, 'insertStudents', function(studentsType, groupNumber, peoplePerGroup, cb) {
  		cb(null, insertedStudentsId, null);
  	});

  	var insertedActivityId = 201;
  	var activityCreateDaoStub = sandbox.stub(activityCreateDao, 'insertActivity', function(activityObj, cb) {
  		console.log('test activityObj: ' + JSON.stringify(activityObj));
  		cb(null, insertedActivityId);
  	});

  	var insertedComposesId = 301;
  	var composesServiceStub = sandbox.stub(composesService, 'addActivity', function(ldId, activityId, cb) {
  		cb(null, insertedComposesId, null);
  	});

  	var technologyServiceStub = sandbox.stub(technologyService, 'insertSupports', function(activityId, technologyNames, cb) {
  		cb();
  	});

  	var resourceServiceStub = sandbox.stub(resourceService, 'addResources', function(activityId, resources, cb) {
  		cb();
  	});

  	var activityObjMatcher = sinon.match({
  		students_id: insertedStudentsId,
  		name: activityData.actName,
  		dur_min: activityData.dur_min,
  		dur_hh: activityData.dur_h,
  		dur_dd: activityData.dur_d,
  		pract_descr: activityData.pract_descr,
  		edu_descr: activityData.edu_descr,
  		modality: activityData.modality
  	});

  	var technologyNamesMatcher = sinon.match(function(value) {
			return value.length === 2 && 
				value[0] === activityData.technologies[0] &&
				value[1] === activityData.technologies[1];
		});

		var fixtureCb = function(err, successInfo, message) {
			expect(err).to.be.null;
			expect(message).to.be.null;
			expect(successInfo.activity_id).to.equal(insertedActivityId);
			expect(successInfo.students_id).to.equal(insertedStudentsId);
			expect(successInfo.composes_id).to.equal(insertedComposesId);

			assert.isTrue(studentsServiceStub.withArgs(activityData.org, activityData.group_number, activityData.people_per_group).calledOnce);
			assert.isTrue(activityCreateDaoStub.withArgs(activityObjMatcher).calledOnce);
			assert.isTrue(composesServiceStub.withArgs(ldId, insertedActivityId).calledOnce);
			assert.isTrue(technologyServiceStub.withArgs(insertedActivityId, activityData.technologies).calledOnce);
			assert.isTrue(resourceServiceStub.withArgs(insertedActivityId, activityData.resources).calledOnce);
			done();
		};

		fixture.createActivity(ldId, activityData, fixtureCb);
  });

});