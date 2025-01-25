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
        return ncsMapping[params.data.ncsClassification] || "미분류";
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
      headerName: "훈련 기간",
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

const ncsMapping = {
  UNDEFINED: "미분류",
  BUSINESS_MANAGEMENT: "01. 사업관리",
  MANAGEMENT_ACCOUNTING_OFFICE_WORK: "02. 경영·회계·사무",
  FINANCE_INSURANCE: "03. 금융·보험",
  EDUCATION_NATURAL_SOCIAL_SCIENCES: "04. 교육·자연·사회과학",
  LAW_POLICE_FIRE_CORRECTIONS_NATIONAL_DEFENSE: "05. 법률·경찰·소방·교도·국방",
  HEALTH_MEDICAL_CARE: "06. 보건·의료",
  SOCIAL_WELFARE_RELIGION: "07. 사회복지·종교",
  CULTURE_ARTS_DESIGN_BROADCASTING: "08. 문화·예술·디자인·방송",
  DRIVING_TRANSPORTATION: "09. 운전·운송",
  SALES_MARKETING: "10. 영업판매",
  SECURITY_CLEANING: "11. 경비·청소",
  ACCOMMODATION_TRAVEL_LEISURE_SPORTS: "12. 이용·숙박·여행·오락·스포츠",
  FOOD_SERVICE: "13. 음식서비스",
  CONSTRUCTION: "14. 건설",
  MACHINERY: "15. 기계",
  MATERIALS: "16. 재료",
  CHEMISTRY_BIOTECHNOLOGY: "17. 화학·바이오",
  TEXTILES_APPAREL: "18. 섬유·의복",
  ELECTRICAL_ELECTRONICS: "19. 전기·전자",
  INFORMATION_COMMUNICATIONS: "20. 정보통신",
  FOOD_PROCESSING: "21. 식품가공",
  PRINTING_WOODWORKING_FURNITURE_CRAFTS: "22. 인쇄·목재·가구·공예",
  ENVIRONMENT_ENERGY_SAFETY: "23. 환경·에너지·안전",
  AGRICULTURE_FORESTRY_FISHERIES: "24. 농림어업"
};