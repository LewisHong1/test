import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Breadcrumb, Button, Card, Col, DatePicker, Form, Radio, Row, Select, Table} from 'antd';
import moment from 'moment'
import { PageHeaderWrapper,  } from '@ant-design/pro-layout';
import styles from '../report.less'


const {Option} = Select
const {RangePicker} = DatePicker
const formatter = 'YYYY-MM-DD'
const formatMonth = 'YYYY-MM'


class Index extends PureComponent {


  column = [
    {
      title: '机构名称',
      dataIndex: 'viewName',
      width: '100px',
      align: 'center',
            render: (text, record) => {

              if ( this.state.location.length <3){
                return (<span style={{ cursor: 'pointer', color: '#1890ff' }}
                              onClick={() => this.searchByColumn(record)}
                >{text}</span>)}
              // if ( this.state.isSecond ==='true'){
              //   return (<span style={{ cursor: 'pointer', color: '#1890ff' }}
              //                 onClick={() => this.searchListByColumn(record)}
              //   >{text}</span>)}

              if ( this.state.isList ==='true'){return (<span>{text}</span>)}

              return (<span style={{ cursor: 'pointer', color: '#1890ff' }}
                            onClick={() => this.searchPeopleByColumn(record)}
              >{text}</span>)
            }
    },
    {
      title: '线上查勘任务数',
      dataIndex: 'surveyTaskAmount',
      width: '100px',
      align: 'center',
            render: (text, record) => {

             return (<span style={{ cursor: 'pointer', color: '#1890ff' }}
                            onClick={() =>
                              this.state.exportType==='web'?this.chooseTaskListByColumn(record,'surveyTaskAmount')
                            : this.exportChooseTaskListByColumn(record,'surveyTaskAmount')
                            }
              >{text}</span>)
            }
    },
    {
      title: '线上定损任务数（转自线上查勘）',
      dataIndex: 'assessTaskAmountFromOnline',
      width: '100px',
      align: 'center',
            render: (text, record) => {

             return (<span style={{ cursor: 'pointer', color: '#1890ff' }}
                            onClick={() =>    this.state.exportType ==='web'?this.chooseTaskListByColumn(record,'assessTaskAmountFromOnline')
                              : this.exportChooseTaskListByColumn(record,'assessTaskAmountFromOnline')
                            }
              >{text}</span>)
            }
    },
    {
      title: '线上定损任务数（转自线下查勘）',
      dataIndex: 'assessTaskAmountFromOffline',
      width: '100px',
      align: 'center',
            render: (text, record) => {

             return (<span style={{ cursor: 'pointer', color: '#1890ff' }}
                            onClick={() =>   this.state.exportType ==='web'?this.chooseTaskListByColumn(record,'assessTaskAmountFromOffline')
                              : this.exportChooseTaskListByColumn(record,'assessTaskAmountFromOffline')}
              >{text}</span>)
            }
    },
  ]

  peopleColumn = [
    {
      title: '姓名',
      dataIndex: 'viewName',
      width: '100px',
      align: 'center',
      render: (text, record) => {

        if ( this.state.location.length <2){
          return (<span style={{ cursor: 'pointer', color: '#1890ff' }}
                        onClick={() => this.searchByColumn(record)}
          >{text}</span>)}
        if ( this.state.isSecond ==='true'){
          return (<span>{text}</span>)}

        if ( this.state.isList ==='true'){return (<span>{text}</span>)}

        return (<span style={{ cursor: 'pointer', color: '#1890ff' }}
                      onClick={() => this.searchPeopleByColumn(record)}
        >{text}</span>)
      }
    },
    {
      title: '线上查勘任务数',
      dataIndex: 'surveyTaskAmount',
      width: '100px',
      align: 'center',
      render: (text, record) => {

        return (<span style={{ cursor: 'pointer', color: '#1890ff' }}
                      onClick={() =>
                        this.state.exportType==='web'?this.chooseTaskListByColumn(record,'surveyTaskAmount')
                          : this.exportChooseTaskListByColumn(record,'surveyTaskAmount')
                      }
        >{text}</span>)
      }
    },
    {
      title: '线上定损任务数（转自线上查勘）',
      dataIndex: 'assessTaskAmountFromOnline',
      width: '100px',
      align: 'center',
      render: (text, record) => {

        return (<span style={{ cursor: 'pointer', color: '#1890ff' }}
                      onClick={() =>    this.state.exportType ==='web'?this.chooseTaskListByColumn(record,'assessTaskAmountFromOnline')
                        : this.exportChooseTaskListByColumn(record,'assessTaskAmountFromOnline')
                      }
        >{text}</span>)
      }
    },
    {
      title: '线上定损任务数（转自线下查勘）',
      dataIndex: 'assessTaskAmountFromOffline',
      width: '100px',
      align: 'center',
      render: (text, record) => {

        return (<span style={{ cursor: 'pointer', color: '#1890ff' }}
                      onClick={() =>   this.state.exportType ==='web'?this.chooseTaskListByColumn(record,'assessTaskAmountFromOffline')
                        : this.exportChooseTaskListByColumn(record,'assessTaskAmountFromOffline')}
        >{text}</span>)
      }
    },
  ]


  listColumn = [

    {
      title: '报案号',
      dataIndex: 'notificationNo',
      width: '100px',
      align: 'center',
    },
    {
      title: '车牌号',
      dataIndex: 'lossName',
      width: '100px',
      align: 'center',
    },
    /* {
      title: '是否线上任务',
      dataIndex: 'isOnlineTask',
      width: '100px',
      align: 'center',
    }, */
    /* {
      title: '机构名称',
      dataIndex: 'viewName',
      width: '100px',
      align: 'center',
    }, */
    {
      title: '报案时间',
      dataIndex: 'notificationDate',
      width: '100px',
      align: 'center',
    },

    /* {
      title: '任务来源',
      dataIndex: 'taskSource',
      width: '100px',
      align: 'center',
    }, */
    {
      title: '查勘员工号',
      dataIndex: 'surveyorCode',
      width: '100px',
      align: 'center',
    },
    {
      title: '查勘员姓名',
      dataIndex: 'surveyorName',
      width: '100px',
      align: 'center',
    },
    /* {
      title: '查勘员归属机构名称',
      dataIndex: 'surveyorBranchName',
      width: '100px',
      align: 'center',
    }, */
    {
      title: '定损员工号',
      dataIndex: 'assessorCode',
      width: '100px',
      align: 'center',
    },
    {
      title: '定损员姓名',
      dataIndex: 'assessorName',
      width: '100px',
      align: 'center',
    },
    /* {
      title: '定损员归属机构名称',
      dataIndex: 'assessorBranchName',
      width: '100px',
      align: 'center',
    }, */
    {
      title: '线上查勘任务分配时间',
      dataIndex: 'surveyTaskAssignTime',
      width: '100px',
      align: 'center',
    },
    {
      title: '线上查勘任务受理时间',
      dataIndex: 'surveyTaskAcceptTime',
      width: '100px',
      align: 'center',
    },
    {
      title: '线上查勘任务完成时间',
      dataIndex: 'surveyTaskFinishTime',
      width: '100px',
      align: 'center',
    },
    {
      title: '线上定损任务分配时间',
      dataIndex: 'assessTaskAssignTime',
      width: '100px',
      align: 'center',
    },
    {
      title: '线上定损任务受理时间',
      dataIndex: 'assessTaskAcceptTime',
      width: '100px',
      align: 'center',
    },
    {
      title: '线上定损任务完成时间',
      dataIndex: 'assessTaskFinishTime',
      width: '100px',
      align: 'center',
    },

    {
      title: '整案转线下原因描述',
      dataIndex: 'caseOperationCauseDescribe',
      width: '100px',
      align: 'center',
    },
    {
      title: '定损任务转线下原因描述',
      dataIndex: 'operation_cause_describe',
      width: '100px',
      align: 'center',
    },
     ]


  state = {
    column: this.column,
    orgAngle:'opcenter',
    statisticDate: moment().subtract(1, "days").format('YYYY-MM-DD'),
    list: [],
    selectedRows: [],
    startDate: moment().subtract(1, "days").format('YYYY-MM-DD'),
    endDate: moment().subtract(1, "days").format('YYYY-MM-DD'),
    statTime: moment().subtract(1, "days").format("YYYY-MM"),
    location: [{
      name: '整体',
      code: '',
      type: 'top-base',
      level:'-1'
    }],
    exportType:'web',
    branchcode: '',
    secCode: '',
    flag: 'day',    // 日报/月报
    isList:"false",  // 是否是清单页面
    isSecond:"false",  // 是否是清单页面
    isChooseList: 'false',
    isPeople:"false",   // 是否是人员页面
    TopLevel:'0',
    PeopleLevel:'0',
    parentViewCode:'',
  };


  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'onlineClaimTask/queryClaimTaskHandle',
      payload: {
        orgAngle: this.state.orgAngle,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        level:'base',
        statTime: this.state.statTime,
        flag: this.state.flag,
      },
    });
  }


  searchButton = () => {
    const { location } = this.state;
    console.log(location)
    console.log(this.state.parentViewCode);
    const {dispatch} = this.props;
    if(this.state.orgAngle==="com"){
      switch (location[location.length - 1].type) {
        case 'top-base' : {
          this.setState({column: this.column})
          dispatch({
            type: 'onlineClaimTask/queryClaimTaskHandle',
            payload: {
              orgAngle: this.state.orgAngle,
              startDate: this.state.startDate,
              endDate: this.state.endDate,
              level:'base',
              statTime: this.state.statTime,
              flag: this.state.flag,
            },
          });
          break;
        }
        case 'top1' : {
          this.setState({column: this.column})
          dispatch({
            type: 'onlineClaimTask/queryClaimTaskHandle',
            payload: {
              orgAngle: this.state.orgAngle,
              startDate: this.state.startDate,
              endDate: this.state.endDate,
              comcode:this.state.parentViewCode,
              level:'second',
              statTime: this.state.statTime,
              flag: this.state.flag,
            },
          });
          break;
        }
        case 'top2' : {
          this.setState({column: this.peopleColumn, branchcode: this.state.parentViewCode})
          dispatch({
            type: 'onlineClaimTask/queryClaimTaskHandlePeople',
            payload: {
              orgAngle: this.state.orgAngle,
              startDate: this.state.startDate,
              endDate: this.state.endDate,
                 branchcode:this.state.parentViewCode,
              level:'base',
              statTime: this.state.statTime,
              flag: this.state.flag,
            },
          });
          break;
        }
        case 'people1' : {
          this.setState({column: this.peopleColumn})
          dispatch({
            type: 'onlineClaimTask/queryClaimTaskHandlePeople',
            payload: {
              orgAngle: this.state.orgAngle,
              startDate: this.state.startDate,
              endDate: this.state.endDate,
              teamleaderCode :this.state.parentViewCode,
              level:'second',
              statTime: this.state.statTime,
              flag: this.state.flag,
            },
          });
          break;
        }
        case 'people2' : {
          dispatch({
            type: 'onlineClaimTask/queryTaskList',
            payload: {
              orgAngle: this.state.orgAngle,
              startDate: this.state.startDate,
              endDate: this.state.endDate,
              surveyorCode :this.state.parentViewCode,
              branchcode: this.state.branchcode,
              statTime: this.state.statTime,
              flag: this.state.flag,
            },
          });
          break;
        }
        default :{
          break;
        }
      }

    }else {


          switch (location[location.length - 1].type) {
            case 'top-base' : {
              dispatch({
                type: 'onlineClaimTask/queryClaimTaskHandle',
                payload: {
                  orgAngle: this.state.orgAngle,
                  startDate: this.state.startDate,
                  endDate: this.state.endDate,
                  level:'base',
                  statTime: this.state.statTime,
                  flag: this.state.flag,
                },
              });
              break;
            }
            case 'top1' : {
              dispatch({
                type: 'onlineClaimTask/queryClaimTaskHandle',
                payload: {
                  orgAngle: this.state.orgAngle,
                  startDate: this.state.startDate,
                  endDate: this.state.endDate,
                  operationCenterCode:this.state.parentViewCode,
                //  comcode:this.state.parentViewCode,
                  level:'second',
                  statTime: this.state.statTime,
                  flag: this.state.flag,
                },
              });
              break;
            }
            case 'top2' : {
              this.setState({column: this.peopleColumn})
              dispatch({
                type: 'onlineClaimTask/queryClaimTaskHandlePeople',
                payload: {
                  orgAngle: this.state.orgAngle,
                  startDate: this.state.startDate,
                  endDate: this.state.endDate,
                  operationTeamCode:this.state.parentViewCode,
               //   branchcode:this.state.parentViewCode,
                  level:'base',
                  statTime: this.state.statTime,
                  flag: this.state.flag,
                },
              });
              break;
            }
            case 'people1' : {
              this.setState({column: this.peopleColumn})
              dispatch({
                type: 'onlineClaimTask/queryClaimTaskHandlePeople',
                payload: {
                  orgAngle: this.state.orgAngle,
                  startDate: this.state.startDate,
                  endDate: this.state.endDate,
                  teamleaderCode :this.state.parentViewCode,
                  level:'second',
                  statTime: this.state.statTime,
                  flag: this.state.flag,
                },
              });
              break;
            }
            case 'people2' : {
              dispatch({
                type: 'onlineClaimTask/queryTaskList',
                payload: {
                  orgAngle: this.state.orgAngle,
                  startDate: this.state.startDate,
                  endDate: this.state.endDate,
                  surveyorCode :this.state.parentViewCode,
                  branchcode: this.state.branchcode,
                  statTime: this.state.statTime,
                  flag: this.state.flag,
                },
              });
              break;
            }
            default :{
              break;
            }
          }
    }
  }


  searchByColumn=(record)=>{
    const { viewCode, viewName } = record;


    const {dispatch} = this.props;
    if(this.state.orgAngle === 'opcenter') {
      dispatch({
        type: 'onlineClaimTask/queryClaimTaskHandle',
        payload: {
          orgAngle: this.state.orgAngle,
          startDate: this.state.startDate,
          endDate: this.state.endDate,
          operationCenterCode: viewCode,
          level: 'second',
          statTime: this.state.statTime,
          flag: this.state.flag,
        },
      });
    }else if(this.state.orgAngle === 'com'){
      dispatch({
        type: 'onlineClaimTask/queryClaimTaskHandle',
        payload: {
          orgAngle: this.state.orgAngle,
          startDate: this.state.startDate,
          endDate: this.state.endDate,
          comcode: viewCode,
          level: 'second',
          statTime: this.state.statTime,
          flag: this.state.flag,
        },
      });
    }


    const { location } = this.state

  if(location.length<2){
    location.push({
      name: viewName,
      code: viewCode,
      type: 'top1',
      level:'base'
    })

  }

  this.setState(
    {
      location,
      TopLevel:'1',
      parentViewCode: viewCode,
    }
  )
  }


  searchPeopleByColumn=(record)=>{
    const { viewCode, viewName } = record
    const { location } = this.state

    const {dispatch} = this.props;
    console.log("   -=-------------------",viewCode)

    if(this.state.orgAngle==="com"){
      this.setState({column: this.peopleColumn, branchcode: viewCode})
      dispatch({
        type: 'onlineClaimTask/queryClaimTaskHandlePeople',
        payload: {
          orgAngle: this.state.orgAngle,
          startDate: this.state.startDate,
          endDate: this.state.endDate,
          branchcode:viewCode,
          statTime: this.state.statTime,
          flag: this.state.flag,
        },
      });


        location.push({
          name: viewName,
          code: viewCode,
          type: 'people1',
          level:'base'
        })


      this.setState(
        {
          location,
          isSecond:"true",
          parentViewCode:viewCode,
        }
      )


    }else if(this.state.orgAngle==="opcenter"){
      if(this.state.PeopleLevel==="0"){
        this.setState({column: this.peopleColumn})
        dispatch({
          type: 'onlineClaimTask/queryClaimTaskHandlePeople',
          payload: {
            orgAngle: this.state.orgAngle,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
            operationTeamCode:viewCode,
            level:'base',
            statTime: this.state.statTime,
            flag: this.state.flag,
          },
        });
        console.log("   people1-=-------------------",viewCode)

          location.push({
            name: viewName,
            code: viewCode,
            type: 'top2',
            level:'second'
          })

     this.setState(
                  {
                    location,
                    PeopleLevel:'1',
                    parentViewCode:viewCode,
                  }
                )

      }else{
        this.setState({column: this.peopleColumn})
        dispatch({
          type: 'onlineClaimTask/queryClaimTaskHandlePeople',
          payload: {
        orgAngle: this.state.orgAngle,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            teamleaderCode :viewCode,
            level:'second',
            statTime: this.state.statTime,
            flag: this.state.flag,
      },
    });
        console.log("   people2-=-------------------",viewCode)
          location.push({
            name: viewName,
            code: viewCode,
            type: 'people1',
            level:'base'
          })

        this.setState(
          {
            location,
            isSecond:"true",
            parentViewCode:viewCode,
          }
        )
      }
    }

  }


  searchListByColumn=(record)=>{
    const { viewCode,viewName } = record
    const { location } = this.state

    const {dispatch} = this.props;
    dispatch({
      type: 'onlineClaimTask/queryTaskList',
      payload: {
        orgAngle: this.state.orgAngle,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        surveyorCode :viewCode,
        branchcode: this.state.branchcode,
        statTime: this.state.statTime,
        flag: this.state.flag,
      },
    });


      location.push({
        name: viewName,
        code: viewCode,
        type: 'people2',
        level:'third'
      })


    this.setState({
      location,
      column: this.listColumn,
      isList: 'true',
      parentViewCode:viewCode,

    })

  }

  

  changeBreadcrumb = (code, type, level) => {
  
    const {dispatch} = this.props;
    const {location} = this.state;

    if(this.state.orgAngle==="com"){
      switch (type) {
        case 'top-base' : {
          
          dispatch({
            type: 'onlineClaimTask/queryClaimTaskHandle',
            payload: {
              orgAngle: this.state.orgAngle,
              startDate: this.state.startDate,
              endDate: this.state.endDate,
              level:'base',
              statTime: this.state.statTime,
              flag: this.state.flag,
            },
          });
          this.setState({column: this.column})
          break;
        }
        case 'top1' : {
          
          dispatch({
            type: 'onlineClaimTask/queryClaimTaskHandle',
            payload: {
              orgAngle: this.state.orgAngle,
              startDate: this.state.startDate,
              endDate: this.state.endDate,
              comcode:code,
              level:'second',
              statTime: this.state.statTime,
              flag: this.state.flag,
            },
          });
          this.setState({column: this.column})
          break;
        }
        case 'top2' : {
          
          dispatch({
            type: 'onlineClaimTask/queryClaimTaskHandlePeople',
            payload: {
              orgAngle: this.state.orgAngle,
              startDate: this.state.startDate,
              endDate: this.state.endDate,
                 branchcode:this.state.parentViewCode,
              level:'base',
              statTime: this.state.statTime,
              flag: this.state.flag,
            },
          });
          this.setState({column: this.peopleColumn, branchcode: this.state.parentViewCode})
          break;
        }
        case 'people1' : {
          
          dispatch({
            type: 'onlineClaimTask/queryClaimTaskHandlePeople',
            payload: {
              orgAngle: this.state.orgAngle,
              startDate: this.state.startDate,
              endDate: this.state.endDate,
              teamleaderCode :this.state.parentViewCode,
              level:'second',
              statTime: this.state.statTime,
              flag: this.state.flag,
            },
          });
          this.setState({column: this.peopleColumn})
          break;
        }
        case 'people2' : {
          dispatch({
            type: 'onlineClaimTask/queryTaskList',
            payload: {
              orgAngle: this.state.orgAngle,
              startDate: this.state.startDate,
              endDate: this.state.endDate,
              surveyorCode :this.state.parentViewCode,
              branchcode: this.state.branchcode,
              statTime: this.state.statTime,
              flag: this.state.flag,
            },
          });
          break;
        }
        default :{
          break;
        }
      }

    }else {
      switch (type) {
        case 'top-base' : {
          
          dispatch({
            type: 'onlineClaimTask/queryClaimTaskHandle',
            payload: {
              orgAngle: this.state.orgAngle,
              startDate: this.state.startDate,
              endDate: this.state.endDate,
              level:'base',
              statTime: this.state.statTime,
              flag: this.state.flag,
            }
          });
          this.setState({column: this.column});
          break;
        }
        case 'top1' : {
          
          dispatch({
            type: 'onlineClaimTask/queryClaimTaskHandle',
            payload: {
                  orgAngle: this.state.orgAngle,
                  startDate: this.state.startDate,
                  endDate: this.state.endDate,
                  operationCenterCode:code,
                //  comcode:this.state.parentViewCode,
                  level:'second',
                  statTime: this.state.statTime,
                  flag: this.state.flag,
            },
          });
          this.setState({column: this.column})
          break;
        }
        case 'top2' : {
  
          dispatch({
            type: 'onlineClaimTask/queryClaimTaskHandlePeople',
            payload: {
                  orgAngle: this.state.orgAngle,
                  startDate: this.state.startDate,
                  endDate: this.state.endDate,
                  operationTeamCode:code,
                  //branchcode:this.state.parentViewCode,
                  level:'base',
                  statTime: this.state.statTime,
                  flag: this.state.flag,
            },
          });
          this.setState({column: this.peopleColumn})
          break;
        }
        case 'people1' : {
          
          dispatch({
            type: 'onlineClaimTask/queryClaimTaskHandlePeople',
            payload: {
              orgAngle: this.state.orgAngle,
              startDate: this.state.startDate,
              endDate: this.state.endDate,
              teamleaderCode :code,
              level:'second',
              statTime: this.state.statTime,
              flag: this.state.flag,
            },
          });
          this.setState({column: this.peopleColumn})
          break;
        }
        case 'people2' : {
          dispatch({
            type: 'onlineClaimTask/queryTaskList',
            payload: {
              orgAngle: this.state.orgAngle,
              startDate: this.state.startDate,
              endDate: this.state.endDate,
              surveyorCode :code,
              branchcode: this.state.branchcode,
              statTime: this.state.statTime,
              flag: this.state.flag,
            },
          });
          break;
        }
        default :{
          break;
        }
      }


    }
    
    const arr = []
    let flag = false
    for(let i=location.length-1; i>=0; i--) {
      if(location[i].code === code && location[i].type === type) {
        flag = true
      }
      if(flag) {
        arr.unshift(location[i])
      }
    }

    this.setState({
      location: arr,
      isList:false,
    })


  }


  changeDateFlag = (e) =>{

    this.setState(
      {
        flag: e.target.value,
      })
    if(this.state.isList === 'false' ) {
      this.searchByDateFlag(this.state.orgAngle, this.state.startDate, this.state.endDate, this.state.statTime, e.target.value)
    }
  }


  searchByDateFlag = (orgAngle, startDate, endDate,statTime,flag) => {
      const { location } = this.state;
      console.log(this.state.parentViewCode);
      const {dispatch} = this.props;
      if(this.state.orgAngle==="com"){
        switch (location[location.length - 1].type) {
          case 'top-base' : {
            this.setState({column: this.column})
            dispatch({
              type: 'onlineClaimTask/queryClaimTaskHandle',
              payload: {
                orgAngle,
                startDate,
                endDate,
                level:'base',
                statTime,
                flag,
              },
            });
            break;
          }
          case 'top1' : {
            this.setState({column: this.column})
            dispatch({
              type: 'onlineClaimTask/queryClaimTaskHandle',
              payload: {
                orgAngle,
                startDate,
                endDate,
                comcode:this.state.parentViewCode,
                level:'second',
                statTime,
                flag,
              },
            });
            break;
          }
          case 'top2' : {
            this.setState({column: this.peopleColumn, branchcode: this.state.parentViewCode})
            dispatch({
              type: 'onlineClaimTask/queryClaimTaskHandlePeople',
              payload: {
                orgAngle,
                startDate,
                endDate,
                branchcode:this.state.parentViewCode,
                level:'base',
                statTime,
                flag,
              },
            });
            break;
          }
          case 'people1' : {
            this.setState({column: this.peopleColumn})
            dispatch({
              type: 'onlineClaimTask/queryClaimTaskHandlePeople',
              payload: {
                orgAngle,
                startDate,
                endDate,
                teamleaderCode :this.state.parentViewCode,
                level:'second',
                statTime,
                flag,
              },
            });
            break;
          }
          case 'people2' : {
            dispatch({
              type: 'onlineClaimTask/queryTaskList',
              payload: {
                orgAngle,
                startDate,
                endDate,
                surveyorCode :this.state.parentViewCode,
                branchcode: this.state.branchcode,
                statTime,
                flag,
              },
            });
            break;
          }
          default :{
            break;
          }
        }

      }else {


        switch (location[location.length - 1].type) {
          case 'top-base' : {
            dispatch({
              type: 'onlineClaimTask/queryClaimTaskHandle',
              payload: {
                orgAngle,
                startDate,
                endDate,
                level:'base',
                statTime ,
                flag,
              },
            });
            break;
          }
          case 'top1' : {
            dispatch({
              type: 'onlineClaimTask/queryClaimTaskHandle',
              payload: {
                orgAngle,
                startDate,
                endDate,
                operationCenterCode:this.state.parentViewCode,
                //  comcode:this.state.parentViewCode,
                level:'second',
                statTime,
                flag,
              },
            });
            break;
          }
          case 'top2' : {
            this.setState({column: this.peopleColumn})
            dispatch({
              type: 'onlineClaimTask/queryClaimTaskHandlePeople',
              payload: {
                orgAngle,
                startDate,
                endDate,
                operationTeamCode:this.state.parentViewCode,
                //   branchcode:this.state.parentViewCode,
                level:'base',
                statTime,
                flag,
              },
            });
            break;
          }
          case 'people1' : {
            this.setState({column: this.peopleColumn})
            dispatch({
              type: 'onlineClaimTask/queryClaimTaskHandlePeople',
              payload: {
                orgAngle,
                startDate,
                endDate,
                teamleaderCode :this.state.parentViewCode,
                level:'second',
                statTime,
                flag,
              },
            });
            break;
          }
          case 'people2' : {
            dispatch({
              type: 'onlineClaimTask/queryTaskList',
              payload: {
                orgAngle,
                startDate,
                endDate,
                surveyorCode :this.state.parentViewCode,
                branchcode: this.state.branchcode,
                statTime,
                flag,
              },
            });
            break;
          }
          default :{
            break;
          }
        }
      }
  }

    chooseTaskListByColumn=(record,columnName)=>{
    const { viewCode } = record
    const { location } = this.state
    const {dispatch} = this.props;


    this.setState({
      location,
      column: this.listColumn,
      isList: 'true',
      isChooseList: 'true',

    })
    if(this.state.orgAngle==="com") {
      switch (location[location.length - 1].type) {
        case 'top-base' : {
          dispatch({
            type: 'onlineClaimTask/chooseTaskList',
            payload: {
              orgAngle: this.state.orgAngle,
              startDate: this.state.startDate,
              endDate: this.state.endDate,
          //    operationCenterCode: viewCode,
              comcode: viewCode,
              columnName,
              statTime: this.state.statTime,
              flag: this.state.flag,
            },
          });
          break;
        }
        case 'top1' : {
          dispatch({
            type: 'onlineClaimTask/chooseTaskList',
            payload: {
              orgAngle: this.state.orgAngle,
              startDate: this.state.startDate,
              endDate: this.state.endDate,
           //   operationTeamCode: viewCode,
              branchcode: viewCode,
              columnName,
              statTime: this.state.statTime,
              flag: this.state.flag,
            },
          });
          break;
        }
        case 'top2' : {
          dispatch({
            type: 'onlineClaimTask/chooseTaskList',
            payload: {
              orgAngle: this.state.orgAngle,
              startDate: this.state.startDate,
              endDate: this.state.endDate,
              teamleaderCode: viewCode,

              columnName,
              statTime: this.state.statTime,
              flag: this.state.flag,
            },
          });
          break;
        }
        case 'people1' : {
          dispatch({
            type: 'onlineClaimTask/chooseTaskList',
            payload: {
              orgAngle: this.state.orgAngle,
              startDate: this.state.startDate,
              endDate: this.state.endDate,
              surveyorCode: viewCode,
              columnName,
              statTime: this.state.statTime,
              flag: this.state.flag,
            },
          });
          break;
        }
        case 'people2' : {
          dispatch({
            type: 'onlineClaimTask/chooseTaskList',
            payload: {
              orgAngle: this.state.orgAngle,
              startDate: this.state.startDate,
              endDate: this.state.endDate,
              surveyorCode: this.state.parentViewCode,
              columnName,
              statTime: this.state.statTime,
              flag: this.state.flag,
            },
          });
          break;
        }
        default : {
          break;
        }
      }
    }else{

      switch (location[location.length - 1].type) {
        case 'top-base' : {
          dispatch({
            type: 'onlineClaimTask/chooseTaskList',
            payload: {
              orgAngle: this.state.orgAngle,
              startDate: this.state.startDate,
              endDate: this.state.endDate,
              operationCenterCode: viewCode,
            //  comcode: viewCode,
              columnName,
              statTime: this.state.statTime,
              flag: this.state.flag,
            },
          });
          break;
        }
        case 'top1' : {
          dispatch({
            type: 'onlineClaimTask/chooseTaskList',
            payload: {
              orgAngle: this.state.orgAngle,
              startDate: this.state.startDate,
              endDate: this.state.endDate,
              operationTeamCode: viewCode,
           //   branchcode: viewCode,
              columnName,
              statTime: this.state.statTime,
              flag: this.state.flag,
            },
          });
          break;
        }
        case 'top2' : {
          dispatch({
            type: 'onlineClaimTask/chooseTaskList',
            payload: {
              orgAngle: this.state.orgAngle,
              startDate: this.state.startDate,
              endDate: this.state.endDate,
              teamleaderCode: viewCode,

              columnName,
              statTime: this.state.statTime,
              flag: this.state.flag,
            },
          });
          break;
        }
        case 'people1' : {
          dispatch({
            type: 'onlineClaimTask/chooseTaskList',
            payload: {
              orgAngle: this.state.orgAngle,
              startDate: this.state.startDate,
              endDate: this.state.endDate,
              surveyorCode: viewCode,
              columnName,
              statTime: this.state.statTime,
              flag: this.state.flag,
            },
          });
          break;
        }
        case 'people2' : {
          dispatch({
            type: 'onlineClaimTask/chooseTaskList',
            payload: {
              orgAngle: this.state.orgAngle,
              startDate: this.state.startDate,
              endDate: this.state.endDate,
              surveyorCode: this.state.parentViewCode,
              columnName,
              statTime: this.state.statTime,
              flag: this.state.flag,
            },
          });
          break;
        }
        default : {
          break;
        }
      }
    }


  }


  exportChooseTaskListByColumn=(record,columnName)=>{
    const { viewCode } = record
    const { location } = this.state
    const {dispatch} = this.props;

    switch (location[location.length - 1].type) {
      case 'top-base' : {
        dispatch({
          type: 'onlineClaimTask/exportChooseTaskList',
          payload: {
            orgAngle: this.state.orgAngle,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            operationCenterCode:viewCode,
            comcode:viewCode,
            columnName,
            statTime: this.state.statTime,
            flag: this.state.flag,
          },
        });
        break;
      }
      case 'top1' : {
        dispatch({
          type: 'onlineClaimTask/exportChooseTaskList',
          payload: {
            orgAngle: this.state.orgAngle,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            operationTeamCode:viewCode,
            branchcode:viewCode,
            columnName,
            statTime: this.state.statTime,
            flag: this.state.flag,
          },
        });
        break;
      }
      case 'top2' : {
        dispatch({
          type: 'onlineClaimTask/exportChooseTaskList',
          payload: {
            orgAngle: this.state.orgAngle,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            teamleaderCode:viewCode,

            columnName,
            statTime: this.state.statTime,
            flag: this.state.flag,
          },
        });
        break;
      }
      case 'people1' : {
        dispatch({
          type: 'onlineClaimTask/exportChooseTaskList',
          payload: {
            orgAngle: this.state.orgAngle,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            surveyorCode :viewCode,
            columnName,
            statTime: this.state.statTime,
            flag: this.state.flag,
          },
        });
        break;
      }
      case 'people2' : {
        dispatch({
          type: 'onlineClaimTask/exportChooseTaskList',
          payload: {
            orgAngle: this.state.orgAngle,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            surveyorCode :this.state.parentViewCode,
            columnName,
            statTime: this.state.statTime,
            flag: this.state.flag,
          },
        });
        break;
      }
      default :{
        break;
      }
    }



  }


  downloadButton=()=>{

    const { location } = this.state;
    console.log(location)
    console.log(this.state.parentViewCode);
    const {dispatch} = this.props;
    switch (location[location.length - 1].type) {
      case 'top-base' : {
        dispatch({
          type: 'onlineClaimTask/exportClaimTaskHandle',
          payload: {
            orgAngle: this.state.orgAngle,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            level:'base',
            statTime: this.state.statTime,
            flag: this.state.flag,
          },
        });
        break;
      }
      case 'top1' : {
        dispatch({
          type: 'onlineClaimTask/exportClaimTaskHandle',
          payload: {
            orgAngle: this.state.orgAngle,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            operationCenterCode:this.state.parentViewCode,
            comcode:this.state.parentViewCode,
            level:'second',
            statTime: this.state.statTime,
            flag: this.state.flag,
          },
        });
        break;
      }
      case 'top2' : {
        dispatch({
          type: 'onlineClaimTask/exportClaimTaskHandlePeople',
          payload: {
            orgAngle: this.state.orgAngle,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            operationTeamCode:this.state.parentViewCode,
            branchcode:this.state.parentViewCode,
            level:'base',
            statTime: this.state.statTime,
            flag: this.state.flag,
          },
        });
        break;
      }
      case 'people1' : {
        dispatch({
          type: 'onlineClaimTask/exportClaimTaskHandlePeople',
          payload: {
            orgAngle: this.state.orgAngle,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            teamleaderCode :this.state.parentViewCode,
            level:'second',
            statTime: this.state.statTime,
            flag: this.state.flag,
          },
        });
        break;
      }
      case 'people2' : {
        dispatch({
          type: 'onlineClaimTask/exportTaskList',
          payload: {
            orgAngle: this.state.orgAngle,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            surveyorCode :this.state.parentViewCode,
            statTime: this.state.statTime,
            flag: this.state.flag,
          },
        });
        break;
      }
      default :{
        break;
      }
    }
  }

  changeStatDate = (e) => {
    this.setState({
      statTime: e.format(formatMonth),
    })
  }

  changeOrgAngle = (e) => {

    const { dispatch } = this.props;
    dispatch({
      type: 'onlineClaimTask/queryClaimTaskHandle',
      payload: {
        orgAngle: e,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        level:'base',
        statTime: this.state.statTime,
        flag: this.state.flag,
      },
    });

      this.setState(
        {
          orgAngle: e,
          column: this.column,
          list: [],
          selectedRows: [],
          location: [{
            name: '整体',
            code: '',
            type: 'top-base',
            level:'-1'
          }],
          exportType:'web',
          isList:"false",  // 是否是清单页面
          isSecond:"false",  // 是否是清单页面
          isPeople:"false",   // 是否是人员页面
          TopLevel:'0',
          PeopleLevel:'0',
          parentViewCode:''
        }
      )
  }


  changeStatisticDate = (e) => {
      this.setState({
        startDate: e[0].format(formatter),
        endDate: e[1].format(formatter),
      })
    }


  render() {
    const { TaskHandleList } = this.props.onlineClaimTask
    const { location,column } = this.state


    return (
      <PageHeaderWrapper title="在线理赔任务处理统计表">
        <Card>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>

              <Form onSubmit={this.handleSearch} layout="horizontal">
                <Row gutter={{ md: 4, lg: 24, xl: 48 }} >
                  {this.state.flag === 'day' ?(
                  <Col xl={12} lg={12} md={12} sm={24}>
                    <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="统计日期">

                        <RangePicker format={this.state.formatter} style={{ width: '100%' }}
                                     defaultValue={[moment(this.state.startDate,formatter), moment(this.state.endDate,formatter)]}
                                     value={[moment(this.state.startDate), moment(this.state.endDate)]}
                                     onChange={this.changeStatisticDate}
                                     disabledDate = {(current => {return current && current > moment(moment().subtract(1, "days").toString())})}
                        />
                    </Form.Item>
                  </Col>):(
                    <Col xl={12} lg={12} md={12} sm={24}>
                      <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="统计日期">

                        <DatePicker
                          value={moment(this.state.statTime)}
                          onChange={this.changeStatDate}
                          defaultValue={moment(this.state.statTime, formatMonth)}
                          format={formatMonth} style={{width: '100%'}}
                          picker="month"/>
                      </Form.Item>
                    </Col>
                  )}
                  <Col md={10} sm={24}>
                    <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="查看维度">
                        <Select defaultValue='opcenter'
                                onChange={(e) => this.changeOrgAngle(e)}
                                style={{ width: '100%' }}>
                          <Option value='opcenter'>作业中心</Option>
                          <Option value='com'>机构</Option>
                        </Select>
                    </Form.Item>
                  </Col>

                  <Col xl={12} lg={12} md={12} sm={24}>
                    <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="展示形式">

                        <Select
                          defaultValue='web'
                                onChange={(e) => this.setState({ exportType: e })} disabled={ this.state.isShowReport === 'true'}
                                style={{ width: '100%' }}>
                          <Option value='web'>网页</Option>
                          <Option value='excel'>Excel</Option>
                        </Select>

                    </Form.Item>
                  </Col>
                  <Col md={8} sm={24}>
                    <Form.Item labelCol={{ span: 2 }} wrapperCol={{ span: 15 }}  label="">
                      <Radio.Group defaultValue='day' value={this.state.flag} onChange={(e) => this.changeDateFlag(e)}>
                        <Radio value='day'>日报</Radio>
                        <Radio value='month'>月报</Radio>
                      </Radio.Group>

                    </Form.Item>
                  </Col>

                  <Col xl={3} lg={3} md={4} sm={24}>
            <span className={styles.submitButtons}>
              {
                this.state.exportType === 'web' ?
                  (
                    this.state.isList === 'true' && this.state.isChooseList === 'true'?
                      (<Button type="primary" disabled>
                        查询
                      </Button>):(
                        <Button type="primary" onClick={this.searchButton}>
                          查询
                        </Button>
                      )
                  ) :
                  (
                    this.state.isList === 'true' && this.state.isChooseList === 'true'?
                      (
                        <Button type="primary" disabled >
                          下载
                        </Button>
                      ):(
                        <Button type="primary" onClick={this.downloadButton}>
                          下载
                        </Button>
                      )
                  )
              }
            </span>
                  </Col>

                </Row>
              </Form>

            </div>
            <div className={styles.tableListOperator}>
              <Breadcrumb>
                {location.map(lo => {
                  return (
                    // eslint-disable-next-line no-script-url
                    <Breadcrumb.Item href='javascript:void(0)'
                                     onClick={() => this.changeBreadcrumb(lo.code, lo.type,lo.level)}>{lo.name}</Breadcrumb.Item>
                  )
                })}
              </Breadcrumb>
            </div>
            {
              (this.state.isList === 'true') ?
                (
                  <Table
                    dataSource={TaskHandleList}
                    columns={this.state.column}
                    scroll={{x: 1000, y: 768}}
                    size='small'
                    // bordered={true}
                    loading={this.props.loading}
                    pagination={false}
                    footer={() => '此处最多显示20条数据，完整清单请下载Excel文件'}
                  />
                ) : (
                  <Table
                    dataSource={TaskHandleList}
                    columns={this.state.column}
                    scroll={{x: 1000, y: 768}}
                    size='small'
                    loading={this.props.loading}
                    pagination={false}
                  />
                )
            }
          </div>
        </Card>
        <div style={{ marginTop: 20 }}>
          <div>报表简介：反应已经上线在线理赔系统的机构，在统计时间段内的线上任务的处理情况，包括线上查勘任务和线上定损任务</div>
          <div>线上查勘任务：案件线上查勘完成时间</div>
          <div>线上定损任务：案件线上定损完成时间</div>
          <div>
            分析指标：
            <div style={{ marginLeft: 15 }}>
              <div><span className={styles.bold_font}>线上查勘任务数: </span>满足在班规则报案数，其中由在线理赔人员完成线上查勘任务的案件数量。与&quot;在线理赔各环节转化率&quot;中线上查勘报案数一致</div>
              <div><span className={styles.bold_font}>线上定损任务数（转自线上查勘）: </span>线上查勘报案数，其中由在线理赔人员完成线上定损任务的案件数量</div>
              <div><span className={styles.bold_font}>线上定损任务数（转自线下查勘）: </span>线下查勘任务完成后，再由在线理赔人员完成线上定损任务的案件数量</div>
            </div>
          </div>
        </div>



      </PageHeaderWrapper>
    );
  }
}



export default connect(({onlineClaimTask, loading}) => ({
  onlineClaimTask,
  loading: loading.models.onlineClaimTask,
})) (Index);
