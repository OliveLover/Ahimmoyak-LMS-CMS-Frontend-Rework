import Badge from 'react-bootstrap/Badge'
import './AddCourseMeta.css';

const AddCourseMeta = ({ courseData, setCourseData }) => {

  const isCourseTitleValid = courseData.courseTitle.trim() !== '';

  const handleCardTypeChange = (e) => {
    const value = e.target.value;
    let updatedTypes = [...courseData.cardType];

    if (updatedTypes.includes(value)) {
      updatedTypes = updatedTypes.filter((cardType) => cardType !== value);
    } else {
      updatedTypes.push(value);
    }

    const cardTypeMapping = {
      '내일배움카드': 'NATIONAL_EMPLOYMENT_SUPPORT_CARD',
      '기업직업훈련카드': 'CORPORATE_TRAINING_SUPPORT_CARD',
    };

    const mappedCardTypes = updatedTypes.map(type => cardTypeMapping[type] || type);

    setCourseData({ ...courseData, cardType: mappedCardTypes });
  };

  const getDisplayCardType = (cardType) => {
    const displayMapping = {
      'NATIONAL_EMPLOYMENT_SUPPORT_CARD': '내일배움카드',
      'CORPORATE_TRAINING_SUPPORT_CARD': '기업직업훈련카드',
    };
    return displayMapping[cardType] || cardType;
  };

  return (
    <div className="add-course-meta-contents">
      <form>
        <div className="course-meta-input-group">
          <label htmlFor="courseName">과정명</label>
          <input
            type="text"
            id="courseName"
            value={courseData.courseTitle || ''}
            onChange={(e) => setCourseData({ ...courseData, courseTitle: e.target.value })}
            placeholder="과정명을 입력하세요"
            required
          />
          <div className="course-meta-error-message">
            {!isCourseTitleValid && <small>과정명을 입력해야 합니다.</small>}
          </div>
        </div>

        <div className="course-meta-input-group-flex">
          <div className="course-meta-input-group">
            <label htmlFor="instructor">강사명</label>
            <input
              type="text"
              id="instructor"
              value={courseData.instructor || ''}
              onChange={(e) => setCourseData({ ...courseData, instructor: e.target.value })}
              placeholder="강사명을 입력하세요"
              required
            />
          </div>
          <div className="course-meta-input-group">
            <label htmlFor="ncsClassification">분류</label>
            <select
              id="ncsClassification"
              value={courseData.ncsClassification || ''}
              onChange={(e) => setCourseData({ ...courseData, ncsClassification: e.target.value })}
              required
            >
              <option value="UNDEFINED">분류를 선택하세요</option>
              <option value="BUSINESS_MANAGEMENT">01. 사업관리</option>
              <option value="MANAGEMENT_ACCOUNTING_OFFICE_WORK">02. 경영·회계·사무</option>
              <option value="FINANCE_INSURANCE">03. 금융·보험</option>
              <option value="EDUCATION_NATURAL_SOCIAL_SCIENCES">04. 교육·자연·사회과학</option>
              <option value="LAW_POLICE_FIRE_CORRECTIONS_NATIONAL_DEFENSE">05. 법률·경찰·소방·교도·국방</option>
              <option value="HEALTH_MEDICAL_CARE">06. 보건·의료</option>
              <option value="SOCIAL_WELFARE_RELIGION">07. 사회복지·종교</option>
              <option value="CULTURE_ARTS_DESIGN_BROADCASTING">08. 문화·예술·디자인·방송</option>
              <option value="DRIVING_TRANSPORTATION">09. 운전·운송</option>
              <option value="SALES_MARKETING">10. 영업판매</option>
              <option value="SECURITY_CLEANING">11. 경비·청소</option>
              <option value="ACCOMMODATION_TRAVEL_LEISURE_SPORTS">12. 이용·숙박·여행·오락·스포츠</option>
              <option value="FOOD_SERVICE">13. 음식서비스</option>
              <option value="CONSTRUCTION">14. 건설</option>
              <option value="MACHINERY">15. 기계</option>
              <option value="MATERIALS">16. 재료</option>
              <option value="CHEMISTRY_BIOTECHNOLOGY">17. 화학·바이오</option>
              <option value="TEXTILES_APPAREL">18. 섬유·의복</option>
              <option value="ELECTRICAL_ELECTRONICS">19. 전기·전자</option>
              <option value="INFORMATION_COMMUNICATIONS">20. 정보통신</option>
              <option value="FOOD_PROCESSING">21. 식품가공</option>
              <option value="PRINTING_WOODWORKING_FURNITURE_CRAFTS">22. 인쇄·목재·가구·공예</option>
              <option value="ENVIRONMENT_ENERGY_SAFETY">23. 환경·에너지·안전</option>
              <option value="AGRICULTURE_FORESTRY_FISHERIES">24. 농림어업</option>
            </select>
          </div>
        </div>

        <div className="course-meta-input-group">
          <label htmlFor="courseDescription">과정소개</label>
          <textarea
            id="courseDescription"
            value={courseData.courseIntroduce || ''}
            onChange={(e) => setCourseData({ ...courseData, courseIntroduce: e.target.value })}
            placeholder="과정 소개를 입력하세요"
            required
          />
        </div>

        <div className="course-meta-input-group-file-and-type">
          <div className="course-meta-input-group">
            <label htmlFor="fundingType">환급 여부</label>
            <select
              id="fundingType"
              value={courseData.fundingType || ''}
              onChange={(e) => setCourseData({ ...courseData, fundingType: e.target.value })}
              required
            >
              <option value="PENDING">미정</option>
              <option value="NON_REFUNDABLE">비환급 과정</option>
              <option value="REFUNDABLE">환급 과정</option>
            </select>
          </div>
          <div className="course-meta-input-group">
            <label htmlFor="cardType">지원 종류</label>
            <div className="card-type-selection">
              {['NATIONAL_EMPLOYMENT_SUPPORT_CARD', 'CORPORATE_TRAINING_SUPPORT_CARD'].map((type) => (
                <button
                  key={type}
                  id="cardType"
                  type="button"
                  value={type}
                  onClick={handleCardTypeChange}
                  className={courseData.cardType.includes(type) ? 'selected' : ''}
                >
                  {type === 'NATIONAL_EMPLOYMENT_SUPPORT_CARD' ? '내일배움카드' : '기업직업훈련카드'}
                </button>
              ))}
            </div>

            <div className="selected-card-types">
              <p>선택한 지원 종류</p>
              <div className="selecte-card-show-wrap">
                {courseData.cardType.length > 0 &&
                  courseData.cardType.map((type) => (
                    <Badge key={type} pill bg="secondary" className="m-1">
                      {getDisplayCardType(type)}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>

        </div>

        <div className="course-meta-input-group-flex">
          <div className="course-meta-input-group">
            <label htmlFor="grade">등급</label>
            <select
              id="grade"
              value={courseData.grade || ''}
              onChange={(e) => setCourseData({ ...courseData, grade: e.target.value })}
              required
            >
              <option value="PENDING">미정</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>

          <div className="course-meta-input-group">
            <label htmlFor="isActive">활성화 여부</label>
            <select
              id="isActive"
              value={courseData.status || ''}
              onChange={(e) => setCourseData({ ...courseData, status: e.target.value })}
              required
            >
              <option value="INACTIVE">비활성화</option>
              <option value="ACTIVE">활성화</option>
            </select>
          </div>
        </div>

        <div className="course-meta-input-group-flex">
          <div className="course-meta-input-group">
            <label htmlFor="duration">수강 기간(일)</label>
            <input
              type="number"
              id="duration"
              value={courseData.setDuration}
              onChange={(e) => setCourseData({ ...courseData, setDuration: Math.min(100, Math.max(1, e.target.value)) })}
              min="1"
              max="100"
              required
            />
          </div>

          <div className="course-meta-input-group">
            <label htmlFor="startDate">시작일</label>
            <input
              type="date"
              id="startDate"
              value={courseData.activeStartDate || ''}
              onChange={(e) => setCourseData({ ...courseData, activeStartDate: e.target.value })}
              required
            />
          </div>

          <div className="course-meta-input-group">
            <label htmlFor="endDate">종료일</label>
            <input
              type="date"
              id="endDate"
              value={courseData.activeEndDate || ''}
              onChange={(e) => setCourseData({ ...courseData, activeEndDate: e.target.value })}
              required
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCourseMeta;
