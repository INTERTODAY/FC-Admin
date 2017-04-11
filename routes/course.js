var express = require('express');
const router = express.Router();
const mySqlDbc = require('../commons/db_conn')();
const connection = mySqlDbc.init();
const QUERY = require('../database/query');
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.role === 'supervisor') {
      return res.redirect('achievement');
    }
    return next();
  }
  res.redirect('/login');
};
require('../commons/helpers');
const async = require('async');
// var UTIL = require('../util/util');
const CourseService = require('../service/CourseService');
const pool = require('../commons/db_conn_pool');

/**
 * 강의/강사등록 첫 페이지
 */
router.get('/', isAuthenticated, (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    async.series(
      [
        (callback) => {
          connection.query(QUERY.COURSE.GetCourseList,
            [req.user.fc_id], (err, rows) => {
              console.log(rows);
              if (err) {
                console.error(err);
                callback(err, null);
              } else {
                callback(null, rows);
              }
            });
        },
        (callback) => {
          connection.query(QUERY.COURSE.GetTeacherList,
            [req.user.fc_id],
            (err, rows) => {
              if (err) {
                console.error(err);
                callback(err, null);
              } else {
                callback(null, rows);
              }
            });
        }
      ],
      (err, result) => {
        connection.release();
        if (err) {
          console.error(err);
        } else {
          res.render('course', {
            current_path: 'Course',
            title: global.PROJ_TITLE + 'Course',
            loggedIn: req.user,
            list: result[0],
            teacher_list: result[1]
          });
        }
      });
  });
});

/**
 * 강의/강사등록 상세페이지
 */
router.get('/details', isAuthenticated, (req, res) => {
  const { id: courseId } = req.query;
  let teacherId = null;

  pool.getConnection((err, connection) => {
    if (err) throw err;
    async.series([
      // 강의정보를 조회한다.
      // result[0]
      (callback) => {
        connection.query(QUERY.COURSE.GetCourseListById,
          [req.user.fc_id, courseId],
          (err, rows) => {
            if (err) {
              callback(err, null);
            } else {
              callback(null, rows);
            }
          }
        );
      },
      // 강의평가 정보를 조회한다.
      // result[1]
      (callback) => {
        connection.query(QUERY.COURSE.GetStarRatingByCourseId,
          [courseId],
          (err, rows) => {
            if (err) {
              console.error(err);
              callback(err, null);
            } else {
              if (rows.length === 0 || rows === null) {
                callback(null, [{course_id: courseId, rate: 0}]);
              } else {
                callback(null, rows);
              }
            }
          }
        );
      },
      // 강의 세션목록을 조회한다.
      // result[2]
      (callback) => {
        connection.query(QUERY.COURSE.GetSessionListByCourseId,
          [courseId],
          (err, rows) => {
            if (err) {
              console.error(err);
              callback(err, null);
            } else {
              callback(null, rows);
            }
          }
        );
      },
      // 강사 정보를 조회한다.
      // result[3]
      (callback) => {
        connection.query(QUERY.COURSE.GetTeacherInfoByCourseId,
          [courseId],
          (err, rows) => {
            if (err) {
              console.error(err);
              callback(err, null);
            } else {
              teacherId = rows[0].teacher_id;
              callback(null, rows);
            }
          }
        );
      },
      // 강사 목록을 조회한다.
      // result[4]
      (callback) => {
        connection.query(QUERY.COURSE.GetTeacherList,
          [req.user.fc_id],
          (err, rows) => {
            if (err) {
              console.error(err);
              callback(err, null);
            } else {
              callback(null, rows);
            }
          }
        );
      },
      // 강사평가 정보를 조회한다.
      // result[5]
      (callback) => {
        connection.query(QUERY.COURSE.GetStarRatingByTeacherId,
          [ teacherId ],
          (err, rows) => {
            // callback(err, rows);
            if (err) {
              console.error(err);
              callback(err, null);
            } else {
              if (rows.length === 0 || rows === null) {
                callback(null, [{ teacher_rate: 0 }]);
              } else {
                callback(null, rows);
              }
            }
          }
        );
      }],
      // out
      (err, result) => {
        connection.release();
        if (err) {
          console.error(err);
        } else {
          res.render('course_details', {
            current_path: 'CourseDetails',
            title: global.PROJ_TITLE + 'Course Details',
            loggedIn: req.user,
            list: result[0],
            rating: result[1],
            session_list: result[2],
            teacher_info: result[3],
            teacher_list: result[4],
            teacher_rating: result[5],
            course_id: courseId
          });
        }
      });
  });
});

/**
 * 강의 세션수를 조회한다.
 */
router.get('/sessioncount', isAuthenticated, (req, res) => {
  var _id = req.query.id;
  connection.query(QUERY.COURSE.GetSessionCount, [_id], (err, data) => {
    if (err) {
      // 쿼리 실패
      return res.json({
        success: false,
        msg: err
      });
    } else {
      // 쿼리 성공
      return res.json({
        success: true,
        session_count: data[0].session_count
      });
    }
  });
});

/**
 * 강의/강사등록 > 강의생성
 */
router.post('/register', isAuthenticated, (req, res) => {
  const {
    course_name: courseName,
    course_desc: courseDescription,
    teacher_id: teacherId
  } = req.body;
  const adminId = req.user.admin_id;

  connection.query(QUERY.COURSE.CreateCourse,
    [
      courseName,
      teacherId,
      courseDescription,
      adminId
    ],
    (err, rows) => {
      if (err) {
        console.error(err);
      } else {
        res.redirect('/course');
      }
    }
  );
});

/**
 * 강의/강사등록 > 강의수정
 */
router.post('/modify', isAuthenticated, (req, res) => {
  const {
    course_id: courseId,
    course_name: courseName,
    course_desc: courseDescription,
    teacher_id: teacherId
  } = req.body;
  const adminId = req.user.admin_id;

  connection.query(QUERY.COURSE.UpdateCourse,
    [
      courseName,
      teacherId,
      courseDescription,
      adminId,
      new Date(),
      courseId
    ],
    (err, rows) => {
      if (err) {
        console.error(err);
      } else {
        res.redirect('/course/details?id=' + courseId);
      }
    });
});

/** 강의 비활성화 */
router.delete('/deactivate', isAuthenticated, (req, res, next) => {
  CourseService.deactivateById(req.query.course_id, (err, data) => {
    if (err) {
      return res.json({
        success: false,
        msg: err
      });
    }

    return res.json({
      success: true
    });
  });
});

/**
 * 강의/강사등록 상세페이지 > 강사등록
 */
router.post('/create/teacher', isAuthenticated, (req, res) => {
  const _name = req.body.teacher.trim();
  const _desc = req.body.teacher_desc.trim();

  connection.query(QUERY.COURSE.CreateTeacher,
    [
      _name, _desc, req.user.admin_id
    ],
    (err, rows) => {
      if (err) {
        console.error(err);
      } else {
        res.redirect('/course');
      }
    }
  );
});

/** 교육과정 비활성화 */
router.delete('/teacher', isAuthenticated, (req, res, next) => {
  CourseService.deactivateTeacherById(req.query.id, (err, data) => {
    if (err) {
      return res.json({
        success: false,
        msg: err
      });
    }
    return res.json({
      success: true
    });
  });
});

/**
 * 강의/강사등록 상세페이지 > 강사수정
 */
router.post('/modify/teacher', isAuthenticated, (req, res) => {
  const _id = req.body.id;
  const _name = req.body.teacher.trim();
  const _desc = req.body.teacher_desc.trim();

  connection.query(QUERY.COURSE.UpdateTeacher,
    [ _name, _desc, _id ],
    (err, rows) => {
      if (err) {
        console.error(err);
      } else {
        res.redirect('/course');
      }
    });
});

/**
 * 강의/강사등록 상세페이지 > 등록된 비디오 보기
 */
router.get('/video', isAuthenticated, (req, res) => {
  const { id: videoId } = req.query;
  connection.query(QUERY.COURSE.GetVideoDataById,
    [ videoId ],
    (err, rows) => {
      if (err) {
        console.error(err);
      } else {
        res.render('winpops/win_show_video', {
          current_path: 'winpop',
          title: global.PROJ_TITLE + 'Video',
          loggedIn: req.user,
          video: rows
        });
      }
    }
  );
});

/**
 * 강의/강사등록 상세페이지 > 비디오 생성 팝업
 */
router.get('/create/video', isAuthenticated, (req, res) => {
  const { course_id: courseId } = req.query;
  res.render('winpops/win_create_video', {
    current_path: 'winpop',
    module_type: 'create_video',
    title: global.PROJ_TITLE + 'Register Video',
    loggedIn: req.user,
    course_id: courseId
  });
});

/**
 * 비디오 등록하기
 */
router.post('/create/video', isAuthenticated, (req, res) => {
  const {
    course_id: courseId,
    video_name: videoName,
    video_provider: videoProvider,
    video_code: videoCode
  } = req.body;
  const adminId = req.user.admin_id;

  connection.beginTransaction(() => {
    async.waterfall(
      [
        (callback) => {
          connection.query(QUERY.COURSE.CreateVideo,
            [
              videoName,
              videoProvider,
              videoCode,
              adminId
            ],
            (err, result) => {
              if (err) {
                console.error(err);
                callback(err, null);
              } else {
                callback(null, result);
              }
            }
          );
        },
        (ret, callback) => {
          let videoId = ret.insertId;
          connection.query(QUERY.COURSE.InsertIntoCourseListForVideo,
            [
              courseId,
              'VIDEO',
              videoName,
              videoId
            ],
            (err, result) => {
              if (err) {
                console.error(err);
                callback(err, null);
              } else {
                callback(null, result);
              }
            }
          );
        }
      ],
      (err, result) => {
        if (err) {
          connection.rollback();
          return res.json({
            success: false,
            msg: err
          });
        } else {
          if (result) {
            connection.commit();
            return res.json({
              success: true
            });
          }
        }
      });
  });
});

/**
 * 강의/강사등록 상세페이지 > 비디오 수정 팝업
 */
router.get('/modify/video', isAuthenticated, (req, res) => {
  const _params = req.query;

  connection.query(QUERY.COURSE.GetVideoDataById,
    [ _params.video_id ],
    (err, data) => {
      console.log(data[0]);
      if (err) {
        console.error(err);
      } else {
        res.render('winpops/win_modify_video', {
          current_path: 'winpop',
          module_type: 'modify_video',
          title: global.PROJ_TITLE + 'Modify Video',
          loggedIn: req.user,
          video: data[0],
          course_id: _params.course_id,
          course_list_id: _params.course_list_id
        });
      }
    }
  );
});

/**
 * 강의/강사등록 상세페이지 > 비디오 수정
 */
router.put('/modify/video', isAuthenticated, (req, res) => {
  const _inputs = req.body;
  let _query = null;

  connection.beginTransaction((err) => {
    // 트렌젝션 오류 발생
    if (err) {
      res.json({
        success: false,
        msg: err
      });
    }
    async.series([
      // 세션 수정
      (callback) => {
        _query = connection.query(QUERY.COURSE.UpdateSessionTitleById, [_inputs.video_name, _inputs.course_list_id], (err, data) => {
          console.log(_query.sql);
          callback(err, data);
        });
      },
      // 비디오 수정
      (callback) => {
        _query = connection.query(QUERY.COURSE.UpdateVideoById,
          [
            _inputs.video_name,
            _inputs.video_provider,
            _inputs.video_code,
            _inputs.video_id
          ],
          (err, data) => {
            console.log(_query.sql);
            callback(err, data);
          }
        );
      }
    ],
    (err, results) => {
      if (err) {
        // 쿼리 오류
        return connection.rollback(() => {
          res.json({
            success: false,
            msg: err
          });
        });
      } else {
        connection.commit((err) => {
          // 커밋 오류
          if (err) {
            return connection.rollback(() => {
              res.json({
                success: false,
                msg: err
              });
            });
          }
          // 커밋 성공
          res.json({
            success: true
          });
        });
      }
    });
  });
});

/**
 * 퀴즈 보기 페이지를 제공한다.
 */
router.get('/quiz', isAuthenticated, (req, res) => {
  var _inputs = req.query;

  connection.query(QUERY.COURSE.GetQuizDataByGroupId, [ _inputs.id ], (err, data) => {
    if (err) {
      // 쿼리 실패
      console.error(err);
    } else {
      let quizList = CourseService.makeQuizList(data);

      // 쿼리 성공
      res.render('winpops/win_show_quiz', {
        current_path: 'winpop',
        module_type: 'show_quiz',
        title: global.PROJ_TITLE + 'Quiz',
        loggedIn: req.user,
        type: _inputs.type,
        quiz_title: _inputs.title,
        quiz: quizList
      });
    }
  });
});

/**
 * 강의/강사등록 상세페이지 > 퀴즈/파이널테스트 생성 팝업
 */
router.get('/create/quiz', isAuthenticated, (req, res) => {
  const { course_id: courseId, type: quizType } = req.query;

  res.render('winpops/win_create_quiz', {
    current_path: 'winpop',
    module_type: 'create_quiz',
    type: req.query.type,
    title: global.PROJ_TITLE + 'Create ' + quizType,
    loggedIn: req.user,
    course_id: courseId
  });
});

/**
 * 강의세션을 등록한다.
 */
router.post('/quiz/courselist', isAuthenticated, (req, res) => {
  const inputs = req.body;
  let _query = null;

  _query = connection.query(QUERY.COURSE.InsertIntoCourseListForQuiz, [
    inputs.course_id,
    inputs.type,
    inputs.title,
    inputs.quiz_group_id,
    inputs.order
  ],
  (err, data) => {
    console.log(err);
    inputs.course_list_id = data.insertId;
    console.log(_query.sql);

    if (err) {
      return res.json({
        success: false,
        msg: err
      });
    } else {
      inputs.course_list_id = data.insertId;
      return res.json({
        success: true,
        inputs: inputs
      });
    }
  });
});

/**
 * 강의/강사등록 상세페이지 > 퀴즈 생성 팝업 > 퀴즈 그룹 등록
 * 진행순서
 * 1. 퀴즈 (quiz)를 생성.
 * 2. 퀴즈 그룹 (quiz_group)을 생생.
 * 3. 보기 (quiz_option)를 생성. (선택형/다답형)
 * @return quiz_id
 */
router.post('/quiz', isAuthenticated, (req, res) => {
  const inputs = req.body;

  connection.beginTransaction((err) => {
    if (err) {
      res.json({
        success: false,
        msg: err
      });
    }

    async.series([
      // 퀴즈를 생성한다.
      (callback) => {
        if (inputs.quiz.options.length) {
          // 선택형, 다답형
          connection.query(QUERY.COURSE.CreateQuizWithOption,
            [
              inputs.quiz.type,
              inputs.quiz.quiz_type,
              inputs.quiz.question,
              inputs.quiz.option_group_id
            ],
            (err, data) => {
              inputs.quiz.quiz_id = data.insertId;
              callback(err, data);
            }
          );
        } else {
          // 단답형
          connection.query(QUERY.COURSE.CreateQuizNoOption,
            [
              inputs.quiz.type,
              inputs.quiz.quiz_type,
              inputs.quiz.question,
              inputs.quiz.answer_desc
            ],
            (err, data) => {
              inputs.quiz.quiz_id = data.insertId;
              callback(err, data);
            }
          );
        }
      },
            // 퀴즈 그룹을 생생한다.
      (callback) => {
        if (inputs.quiz.quiz_id) {
          connection.query(QUERY.COURSE.InsertOrUpdateQuizGroup,
            [
              inputs.quiz_group_id,
              inputs.quiz.quiz_id,
              inputs.quiz.order,
              inputs.quiz.order
            ],
            (err, data) => {
              callback(err, data); // results[1]
            }
          );
        } else {
          callback(null, null);
        }
      },
      // 퀴즈 보기를 생성한다.
      (callback) => {
        if (inputs.quiz.options.length) {
          CourseService.InsertOrUpdateQuizOptions(connection, inputs.quiz.options, (err, data) => {
            callback(err, data);
          });
        } else {
          callback(null, null);
        }
      }
    ],
    (err, results) => {
      if (err) {
            // 쿼리 오류 발생
        return connection.rollback(() => {
          res.json({
            success: false,
            msg: err
          });
        });
      } else {
        connection.commit((err) => {
            // 커밋 오류 발생
          if (err) {
            return connection.rollback(() => {
              res.json({
                success: false,
                msg: err
              });
            });
          }

            // 커밋 성공
          res.json({
            success: true,
            inputs: inputs
          });
        });
      }
    });
  });
});

/**
 * 강의/강사등록 상세페이지 > 퀴즈 생성 팝업 > 퀴즈 그룹 등록
 *
 * 진행순서
 * 1. 퀴즈 (quiz)를 수정.
 * 2. 보기 (quiz_option)를 재생성. (선택형/다답형)
 */
router.put('/quiz', isAuthenticated, (req, res) => {
  const inputs = req.body;
  let _query = null;

  connection.beginTransaction((err) => {
    if (err) {
      res.json({
        success: false,
        msg: err
      });
    }

    async.series([
      // 퀴즈를 수정한다.
      (callback) => {
        if (inputs.quiz.options.length) {
          // 선택형, 다답형
          _query = connection.query(QUERY.COURSE.UpdateQuizWithOption,
            [
              inputs.quiz.question,
              inputs.quiz.quiz_id
            ],
            (err, data) => {
              console.log(_query.sql);
              callback(err, data);
            }
          );
        } else {
          // 단답형
          _query = connection.query(QUERY.COURSE.UpdateQuizWithNoOption,
            [
              inputs.quiz.question,
              inputs.quiz.answer_desc,
              inputs.quiz.quiz_id
            ],
            (err, data) => {
              console.log(_query.sql);
              callback(err, data);
            }
          );
        }
      },
      // 퀴즈 그룹을 수정한다.
      (callback) => {
        if (inputs.quiz.quiz_id) {
          _query = connection.query(QUERY.COURSE.InsertOrUpdateQuizGroup,
            [
              inputs.quiz_group_id,
              inputs.quiz.quiz_id,
              inputs.quiz.order,
              inputs.quiz.order
            ],
            (err, data) => {
              console.log(_query.sql);
              callback(err, data);
            }
          );
        } else {
          callback(null, null);
        }
      },
      // 퀴즈 보기를 수정한다.
      (callback) => {
        if (inputs.quiz.quiz_id) {
          CourseService.InsertOrUpdateQuizOptions(connection, inputs.quiz.options, (err, data) => {
            callback(err, data);
          });
        } else {
          callback(null, null);
        }
      }
    ],
    (err, results) => {
      if (err) {
        console.log(err);
        // 쿼리 오류 발생
        return connection.rollback(() => {
          res.json({
            success: false,
            msg: err
          });
        });
      } else {
        connection.commit((err) => {
          // 커밋 오류 발생
          if (err) {
            return connection.rollback(() => {
              res.json({
                success: false,
                msg: err
              });
            });
          }
          // 커밋 성공
          res.json({
            success: true,
            inputs: inputs
          });
        });
      }
    });
  });
});

/**
 * 퀴즈를 삭제한다.
 */
router.delete('/quiz', isAuthenticated, (req, res) => {
  const inputs = req.query;
  let query = null;

  connection.beginTransaction((err) => {
    // 트렌젝션 오류 발생시 처리
    if (err) {
      res.json({
        success: false,
        msg: err
      });
    }

    async.series(
      [
        // 1.퀴즈 보기(quiz_option) 삭제
        (callback) => {
          query = connection.query(QUERY.COURSE.DeleteQuizOptionByOptionGroupId, [inputs.option_group_id], (err, data) => {
            // console.log(query.sql);
            callback(err, data);
          });
        },
        // 2.퀴즈(quiz) 를 삭제한다.
        (callback) => {
          query = connection.query(QUERY.COURSE.DeleteQuizById, [inputs.quiz_id], (err, data) => {
            // console.log(query.sql);
            callback(err, data);
          });
        }
        // 3.퀴즈 보기 그룹(quiz_group) 삭제 (CASCADE 제약으로 함께 삭제된다.)
      ],
      (err, results) => {
        if (err) {
          // 쿼리 오류
          return connection.rollback(() => {
            res.json({
              success: false,
              msg: err
            });
          });
        } else {
          connection.commit((err) => {
            // 커밋 오류
            if (err) {
              return connection.rollback(() => {
                res.json({
                  success: false,
                  msg: err
                });
              });
            }
            // 커밋 성공
            return res.json({
              success: true
            });
          });
        }
      }
    );
  });
});

/**
 * 퀴즈/파이널테스트 수정페이지를 보여준다.
 * @req.query
 * course_id, course_list_id, type: QUIZ/FINAL, quiz_group_id
 */
router.get('/modify/quiz', isAuthenticated, (req, res) => {
  const { course_list_id: courseListId, type: quizType } = req.query;

  async.series(
    [
      (callback) => {
        connection.query(QUERY.COURSE.GetSessionById,
          [
            courseListId
          ],
          (err, data) => {
            callback(err, data);
          }
        );
      }
    ],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.render('winpops/win_modify_quiz', {
          current_path: 'winpop',
          module_type: 'modify_quiz',
          type: req.query.type,
          title: global.PROJ_TITLE + 'Modify ' + quizType,
          loggedIn: req.user,
          course_list: results[0][0]
        });
      }
    }
  );
});

/**
 * 퀴즈 보기를 개별삭제한다.
 */
router.delete('/quiz/option', isAuthenticated, (req, res) => {
  const inputs = req.query;
  let query = null;

  connection.beginTransaction((err) => {
    // 트렌젝션 오류 발생시 처리
    if (err) {
      res.json({
        success: false,
        msg: err
      });
    }

    async.series(
      [
        // 1.퀴즈 보기(quiz_option) 삭제
        (callback) => {
          query = connection.query(QUERY.COURSE.DeleteQuizOptionById, [inputs.option_id], (err, data) => {
            console.log(query.sql);
            callback(err, data);
          });
        }
      ],
      (err, results) => {
        if (err) {
          // 쿼리 오류
          return connection.rollback(() => {
            res.json({
              success: false,
              msg: err
            });
          });
        } else {
          connection.commit((err) => {
            // 커밋 오류
            if (err) {
              return connection.rollback(() => {
                res.json({
                  success: false,
                  msg: err
                });
              });
            }
            // 커밋 성공
            return res.json({
              success: true
            });
          });
        }
      }
    );
  });
});

/**
 * 체크리스트 보기 페이지를 제공한다.
 */
router.get('/checklist', isAuthenticated, (req, res) => {
  const { course_list_id: courseListId } = req.query;

  connection.query(QUERY.COURSE.GetChecklistByCourseListId, [ courseListId ], (err, data) => {
    if (err) {
      // 쿼리 실패
      console.error(err);
    } else {
      // 선택형, 다답형일 경우 보기를 배열로 변환한다.
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        if (data[i].item_type !== 'write' && data[i].sample !== '') {
          // data[i].sample = JSON.parse('[' + data[i].sample + ']');
          data[i].sample = data[i].sample.split(',');
        }
      }
      // 쿼리 성공
      res.render('winpops/win_show_checklist', {
        current_path: 'winpop',
        module_type: 'show_checklist',
        title: global.PROJ_TITLE + 'Checklist',
        loggedIn: req.user,
        checklist: data,
        sessionTitle: data[data.length - 1].title
      });
    }
  });
});

/**
 * 강의/강사등록 상세페이지 > 퀴즈/파이널테스트 생성 팝업
 */
router.get('/create/checklist', isAuthenticated, (req, res) => {
  const { course_id: courseId, type: sessionType } = req.query;
  console.log(global.PROJ_TITLE);

  res.render('winpops/win_create_checklist', {
    current_path: 'winpop',
    module_type: 'create_checklist',
    type: req.query.type,
    title: global.PROJ_TITLE + 'Create ' + sessionType,
    loggedIn: req.user,
    course_id: courseId
  });
});

/**
 * 체크리스트를 저정한다.
 */
router.post('/checklist', isAuthenticated, (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.beginTransaction((err) => {
      if (err) throw err;
      CourseService.InsertOrUpdateChecklist(connection, req.body, (err, result) => {
        connection.release();
        if (err) {
          connection.rollback();
          return res.json({
            success: false,
            msg: err
          });
        } else {
          if (result) {
            connection.commit();
            return res.send({
              success: true
            });
          }
        }
      });
    });
  });
});

/**
 * 체크리스트 수정페이지를 보여준다.
 * @req.query
 * course_id, course_list_id, type: QUIZ/FINAL, quiz_group_id
 */
router.get('/modify/checklist', isAuthenticated, (req, res) => {
  const {
    course_list_id: courseListId,
    checklist_group_id: groupId
  } = req.query;

  async.series(
    [
      (callback) => {
        connection.query(QUERY.COURSE.GetSessionById,
          [
            courseListId
          ],
          (err, data) => {
            callback(err, data);
          }
        );
      },
      (callback) => {
        connection.query(QUERY.COURSE.GetChecklistByGroupId,
          [
            groupId
          ],
          (err, data) => {
            callback(err, data);
          }
        );
      }
    ],
    (err, results) => {
      // console.log(results[0][0]);
      if (err) {
        console.error(err);
      } else {
        res.render('winpops/win_modify_checklist', {
          current_path: 'winpop',
          module_type: 'modify_checklist',
          type: req.query.type,
          title: global.PROJ_TITLE + 'Modify Checklist',
          loggedIn: req.user,
          course_list: results[0][0],
          checklists: results[1]
        });
      }
    }
  );
});

/**
 * 체크리스트를 삭제한다.
 */
router.delete('/checklist', isAuthenticated, (req, res) => {
  const { checklist_id: checklistId, checklist_group_id: groupId } = req.query;

  connection.beginTransaction((err) => {
    // 트렌젝션 오류 발생시 처리
    if (err) {
      res.json({
        success: false,
        msg: err
      });
    }

    async.series(
      [
        (callback) => {
          connection.query(QUERY.COURSE.DeleteChecklistGroup, [groupId, checklistId], (err, data) => {
            callback(err, data);
          });
        },
        (callback) => {
          connection.query(QUERY.COURSE.DeleteChecklist, [checklistId], (err, data) => {
            callback(err, data);
          });
        }
      ],
      (err, results) => {
        if (err) {
          // 쿼리 오류
          return connection.rollback(() => {
            res.json({
              success: false,
              msg: err
            });
          });
        } else {
          connection.commit((err) => {
            // 커밋 오류
            if (err) {
              return connection.rollback(() => {
                res.json({
                  success: false,
                  msg: err
                });
              });
            }
            // 커밋 성공
            return res.json({
              success: true
            });
          });
        }
      }
    );
  });
});

/**
 * 강의세션을 수정한다.
 */
router.put('/courselist', isAuthenticated, (req, res) => {
  const inputs = req.body;
  let _query = null;

  _query = connection.query(QUERY.COURSE.UpdateSession,
    [
      inputs.title,
      inputs.course_list_order,
      inputs.course_list_id
    ],
    (err, data) => {
      if (err) {
        return res.json({
          success: false,
          msg: err
        });
      } else {
        return res.json({
          success: true
        });
      }
    }
  );
});

/**
 * 퀴즈를 삭제한다.
 *
 * @req.query :
 *  course_list_id, course_list_type, quiz_group_id
 *
 * 진행순서
 *  1. 비디오/퀴즈/파이널테스트 중 어떤것인지 파악
 *
 * 비디오일 경우:
 *  1. course_list 삭제
 *  2. video 삭제
 *
 * 퀴즈 / 파이널테스트일 경우:
 *  1. 세션정보(course_list) 삭제
 *  2. 퀴즈 보기(quiz_option) 삭제
 *  3. 퀴즈(quiz) 를 삭제한다.
 *  4. 퀴즈 보기 그룹(quiz_group) 삭제
 */
router.delete('/courselist', isAuthenticated, (req, res) => {
  const _inputs = req.query;
  connection.beginTransaction((err) => {
    // 트렌젝션 오류 발생시 처리
    if (err) {
      res.json({
        success: false,
        msg: err
      });
    }

    async.series(
      [
        // 1. 세션정보 삭제
        (callback) => {
          connection.query(QUERY.COURSE.DeleteCourseListId, [_inputs.course_list_id], (err, data) => {
            callback(err, data);
          });
        },
        // 2. 퀴즈 보기 삭제
        (callback) => {
          if (_inputs.course_list_type === 'QUIZ' || _inputs.course_list_type === 'FINAL') {
            connection.query(QUERY.COURSE.DeleteQuizOptionByGroupId, [_inputs.quiz_group_id], (err, data) => {
              callback(err, data);
            });
          } else if (_inputs.course_list_type === 'VIDEO') {
            callback(null, null);
          } else if (_inputs.course_list_type === 'CHECKLIST') {
            callback(null, null);
          }
        },
        // 3.퀴즈/비디오 를 삭제한다.
        (callback) => {
          if (_inputs.course_list_type === 'QUIZ' || _inputs.course_list_type === 'FINAL') {
            connection.query(QUERY.COURSE.DeleteQuizByGroupId, [_inputs.quiz_group_id], (err, data) => {
              callback(err, data);
            });
          } else if (_inputs.course_list_type === 'VIDEO') {
            connection.query(QUERY.COURSE.DeleteVideoById, [_inputs.video_id], (err, data) => {
              callback(err, data);
            });
          } else if (_inputs.course_list_type === 'CHECKLIST') {
            connection.query(QUERY.COURSE.DeleteChecklistByGroupId, [_inputs.checklist_group_id], (err, data) => {
              callback(err, data);
            });
          }
        }
        // 4.퀴즈 보기 그룹(quiz_group) 삭제 (CASCADE 제약으로 함께 삭제된다.)
        // (callback) => {
        //     var query = connection.query(QUERY.COURSE.DeleteQuizGroupByGroupId, [inputs.quiz_group_id], (err, data) => {
        //         console.log(query.sql);
        //         callback(err, data);
        //     });
        // }
      ],
      (err, results) => {
        if (err) {
          console.log(err);
          // 쿼리 오류
          return connection.rollback(() => {
            res.json({
              success: false,
              msg: err
            });
          });
        } else {
          connection.commit((err) => {
            // 커밋 오류
            if (err) {
              return connection.rollback(() => {
                res.json({
                  success: false,
                  msg: err
                });
              });
            }
            // 커밋 성공
            return res.json({
              success: true
            });
          });
        }
      }
    );
  });
});

module.exports = router;
