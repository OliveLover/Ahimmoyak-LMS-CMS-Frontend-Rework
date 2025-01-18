import React, { useMemo, useState } from 'react';
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import './CourseLifecycleStatus.css';

ModuleRegistry.registerModules([AllCommunityModule]);

const CourseLifecycleStatus = ({ courses }) => {
  const [lastClickTime, setLastClickTime] = useState(0);
  const navigate = useNavigate();

  const colDefs = [
    { field: "courseId", headerName: "ID", sortable: true, filter: 'agTextColumnFilter' },
    { field: "courseTitle", headerName: "과정명", sortable: true, filter: 'agTextColumnFilter' },
    {
      field: "instructor",
      headerName: "강사",
      valueGetter: (params) => {
        return params.data.instructor ? params.data.instructor : "미지정";
      },
      sortable: true,
      filter: 'agTextColumnFilter'
    },
    {
      field: "fundingType",
      headerName: "환급 유형",
      valueGetter: (params) => {
        return params.data.fundingType === "PENDING" ? "미지정" : params.data.fundingType;
      },
      sortable: true,
      filter: 'agTextColumnFilter'
    },
    {
      field: "ncsClassification",
      headerName: "NCS 분류",
      valueGetter: (params) => {
        return params.data.ncsClassification === "UNDEFINED" ? "미분류" : params.data.ncsClassification;
      },
      sortable: true,
      filter: 'agTextColumnFilter'
    },
    {
      field: "activeStartDate",
      headerName: "과정 시작일",
      valueGetter: (params) => {
        return params.data.activeStartDate ? params.data.activeStartDate : "미지정";
      },
      sortable: true,
      filter: 'agDateColumnFilter'
    },
    {
      field: "activeEndDate",
      headerName: "과정 종료일",
      valueGetter: (params) => {
        return params.data.activeEndDate ? params.data.activeEndDate : "미지정";
      },
      sortable: true,
      filter: 'agDateColumnFilter'
    },
    {
      field: "remainingDuration",
      headerName: "남은 기간",
      valueGetter: (params) => `${params.data.remainingDuration}일`,
      sortable: true,
      filter: 'agNumberColumnFilter'
    },
    {
      field: "setDuration",
      headerName: "훈련 기간(일)",
      valueGetter: (params) => `${params.data.setDuration}일`,
      sortable: true,
      filter: 'agNumberColumnFilter'
    }
  ];

  const handleRowClick = (params) => {
    const now = Date.now();
    const doubleClickThreshold = 300;

    if (now - lastClickTime < doubleClickThreshold) {
      const courseId = params.data.courseId;

      navigate(`/admin/course-info/${courseId}`);
    }

    setLastClickTime(now);
  };

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      filter: "agTextColumnFilter",
      floatingFilter: true,
      sortable: true
    };
  }, []);

  const paginationPageSize = 10;

  return (
    <div className="course-lifecycle-status">
      <AgGridReact
        rowData={courses}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={[10, 25, 50]}
        onRowClicked={handleRowClick}
      />
    </div>
  );
};

export default CourseLifecycleStatus;
