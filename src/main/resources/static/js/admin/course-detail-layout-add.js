//2025.03.08 조승찬
// 코스 목록 생성하는 함수
function addCourseDetail(course, page, type, keyWord) {

    // 아이디, 페이지, 검색 정보 저장. 삭제 후 원우치로 돌아갈 수 있도록 조치
    console.log("addCourseDetail  "+page+" "+type+" "+keyWord);
    let courseIdDiv = document.createElement("div"); // div 요소를 생성합니다.
    courseIdDiv.innerHTML = `
    <input type="hidden" name="courseId" class="courseId" value="${course.id}"/> 
    <input type="hidden" name="page"     class="page"     value="${page}"/>
    <input type="hidden" name="type"     class="type"     value="${type}"/>
    <input type="hidden" name="keyWord"  class="keyWord"  value="${keyWord}"/>`;
    document.querySelector(".AppLayout_contents__YmI3N").appendChild(courseIdDiv);

    // 코스 제목 생성
    document.querySelector(".TextField_field__YTJkY").innerHTML = `
    <input placeholder="제목을 입력해 주세요" maxlength="40" type="text" class="Input_input__M2Q3Y Input_lg__MDE4M Input_courseName"
           aria-invalid="false" value="${course.courseName}"/>
    `;
    document.querySelector(".HelperMessage_helperMessage__ZTRkO").textContent = `${course.courseName.length}/40`;

    // 봉사 코스일 경우
    if (course.courseIsVolunteer == `Y`) {
        // 시작일, 종료일, 모집 마감일 생성
        const formatStartDate = course.volunteerStartDate.split(" ")[0];
        const formatEndDate = course.volunteerEndDate.split(" ")[0];
        const formatDeadlinDate = course.volunteerDeadline.split(" ")[0];
        document.querySelector(".DurationOfTourContainer").innerHTML = `
            <input type="date" placeholder="시작일" class="SocialRecruiteTagsContainer__SocialRecruiteTagsInput-sc-2762su-1 gcqwwh startdate" value = "${formatStartDate}"/> 
            <span>~</span >
            <input type="date" placeholder="종료일" class="SocialRecruiteTagsContainer__SocialRecruiteTagsInput-sc-2762su-1 gcqwwh enddate" value = "${formatEndDate}"/>
            <span >마감일</span >
            <input type="date" placeholder="모집 마감일" class="SocialRecruiteTagsContainer__SocialRecruiteTagsInput-sc-2762su-1 gcqwwh deadline" value = "${formatDeadlinDate}"/>
            <button type="button" class="CurrentProfile__MoreButton-sc-1u92qay-6 FvtMb" >
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='17' viewBox='0 0 4 17'%3E %3Cpath fill='%23999' fill-rule='evenodd' d='M1.57 14a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0-7a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0-7a1.5 1.5 0 110 3 1.5 1.5 0 010-3z'/%3E %3C/svg%3E" alt="더보기"/>
            </button>
        `;

        // document.querySelector(".gcqwwh.startdate").value = formatStartDate;
        // document.querySelector(".gcqwwh.enddate").value = formatEndDate;
        // document.querySelector(".gcqwwh.deadline").value = formatDeadlinDate;

        // 포함, 불포함, 준비물 입력창 생성
        document.querySelector(".bmexYYinput").innerHTML = `
            <input placeholder="포함 사항 (0/10)"
                   class="SocialRecruiteTagsContainer__SocialRecruiteTagsInput-sc-2762su-1 gcqwwh include"/>
            <input placeholder="불포함 사항 (0/10)"
                   class="SocialRecruiteTagsContainer__SocialRecruiteTagsInput-sc-2762su-1 gcqwwh exclude"/>
            <input placeholder="준비물 (0/10)"
                   class="SocialRecruiteTagsContainer__SocialRecruiteTagsInput-sc-2762su-1 gcqwwh prepare"/>
        `;

        // 안내문 생성
        const newParagraph = document.createElement('p');
        newParagraph.className = 'Textarea__Count-sc-1b9phu6-2 jvAusQ';
        newParagraph.textContent = '입력 후 엔터를 누르면 태그가 생성되요';
        document.querySelector(".bmexYYinput").insertAdjacentElement('afterend', newParagraph);

        // 포함 사항 생성
        if (course.includeContents.length > 0) {
            const bDBbNifirst = document.querySelector(".bDBbNifirst");
            bDBbNifirst.innerHTML = `<header class="Article__Header-sc-1mmkltm-0 gScFGo">
                                        <hgroup>
                                            <h2 class="Article__Title-sc-1mmkltm-1 bZNoYF">포함 사항</h2>
                                        </hgroup>
                                      </header>
                                      <div class="Stuff__StuffContainer-sc-8zlrc8-0 iXEvmI"></div>`;

            parentDiv = bDBbNifirst.querySelector(".iXEvmI");
            course.includeContents.forEach(e => {
                const firstchildDiv = document.createElement("div");
                firstchildDiv.className = "Tag__RoundTag-sxb61j-1 jXxsiv";
                firstchildDiv.innerHTML = `<span>${e}</span>
                     <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'%3E %3Cg fill='none' fill-rule='nonzero' stroke='%23999' stroke-linecap='square'%3E %3Cpath d='M11.828 6.172l-5.656 5.656M11.828 11.828L6.172 6.172'/%3E %3C/g%3E %3C/svg%3E" alt="delete tags item">`;
                parentDiv.appendChild(firstchildDiv);
            });

            // 동적 생성 완료시까지 대기 후 실행
            const observer = new MutationObserver((mutationsList, observer) => {
                const includeElement = document.querySelector(".gcqwwh.include");
                if (includeElement) {
                    includeElement.placeholder = `포함 사항 (${course.includeContents.length}/10)`;
                    observer.disconnect(); // 감지가 끝나면 연결 해제
                }
            });

            // 감시할 부모 요소 지정 (예: body)
            observer.observe(document.body, { childList: true, subtree: true });
        }

        // 불포함 사항 생성
        if (course.excludeContents.length > 0) {
            const bDBbNisecond = document.querySelector(".bDBbNisecond");
            bDBbNisecond.innerHTML = `<header class="Article__Header-sc-1mmkltm-0 gScFGo">
                                    <hgroup>
                                        <h2 class="Article__Title-sc-1mmkltm-1 bZNoYF">불포함 사항</h2>
                                    </hgroup>
                                  </header>
                                  <div class="Stuff__StuffContainer-sc-8zlrc8-0 iXEvmI"></div>`;

            parentDiv = bDBbNisecond.querySelector(".iXEvmI");
            course.excludeContents.forEach(e => {
                const secondchildDiv = document.createElement("div");
                secondchildDiv.className = "Tag__RoundTag-sxb61j-1 eMLPLA";
                secondchildDiv.innerHTML = `<span>${e}</span>
                 <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'%3E %3Cg fill='none' fill-rule='nonzero' stroke='%23999' stroke-linecap='square'%3E %3Cpath d='M11.828 6.172l-5.656 5.656M11.828 11.828L6.172 6.172'/%3E %3C/g%3E %3C/svg%3E" alt="delete tags item">`;
                parentDiv.appendChild(secondchildDiv);
            });

            // 동적 생성 완료시까지 대기 후 실행
            const observer = new MutationObserver((mutationsList, observer) => {
                const excludeElement = document.querySelector(".gcqwwh.exclude");
                if (excludeElement) {
                    excludeElement.placeholder = `불포함 사항 (${course.excludeContents.length}/10)`;
                    observer.disconnect(); // 감지가 끝나면 연결 해제
                }
            });

            // 감시할 부모 요소 지정 (예: body)
            observer.observe(document.body, { childList: true, subtree: true });
        }

        // 준비물 생성
        if (course.prepareContents.length > 0) {
            const bDBbNithird = document.querySelector(".bDBbNithird");
            bDBbNithird.innerHTML = `<header class="Article__Header-sc-1mmkltm-0 gScFGo">
                                    <hgroup>
                                        <h2 class="Article__Title-sc-1mmkltm-1 bZNoYF">준비물</h2>
                                    </hgroup>
                                  </header>
                                  <div class="Stuff__StuffContainer-sc-8zlrc8-0 iXEvmI"></div>`;

            parentDiv = bDBbNithird.querySelector(".iXEvmI");
            course.prepareContents.forEach(e => {
                const thirdchildDiv = document.createElement("div");
                thirdchildDiv.className = "Tag__RoundTag-sxb61j-1 eISlhn";
                thirdchildDiv.innerHTML = `<span>${e}</span>
                 <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'%3E %3Cg fill='none' fill-rule='nonzero' stroke='%23999' stroke-linecap='square'%3E %3Cpath d='M11.828 6.172l-5.656 5.656M11.828 11.828L6.172 6.172'/%3E %3C/g%3E %3C/svg%3E" alt="delete tags item">`;
                parentDiv.appendChild(thirdchildDiv);
            });

            // 동적 생성 완료시까지 대기 후 실행
            const observer = new MutationObserver((mutationsList, observer) => {
                const prepareElement = document.querySelector(".gcqwwh.prepare");
                if (prepareElement) {
                    prepareElement.placeholder = `준비물 (${course.prepareContents.length}/10)`;
                    observer.disconnect(); // 감지가 끝나면 연결 해제
                }
            });

            // 감시할 부모 요소 지정 (예: body)
            observer.observe(document.body, { childList: true, subtree: true });
        }

        // 상세 일정 생성
        if (course.scheduleContents.length > 0){

            const numberOfPerson = document.querySelector(".NumberOfPerson"); // 총 거리/일정/테마 :: 보다 먼저 보여주기 위해서
            const detailOfDateContainer = document.createElement("div");
            detailOfDateContainer.className = "DetailOfDateContainer";

            detailOfDateContainer.innerHTML = `<p>계획서를 저장하시려면 입력창을 열어놓고 등록하세요.</p>`;

            course.scheduleContents.forEach( (e, i) => {
                detailOfDateContainer.innerHTML += ` <p>${i + 1}일차 계획서</p>
                <textarea data-index=${i} placeholder="상세 일정을 적어보세요"
                maxlength="1200"  class="Textarea__StyledTextarea-sc-1b9phu6-1 kmqQeBdetail">${e}</textarea>
                <p class="Textarea__Count-sc-1b9phu6-2 jvAusQdetail"> ${e.length}/1200</p>`;
            });

            numberOfPerson.parentNode.insertBefore(
                detailOfDateContainer,
                numberOfPerson
            );

        }
    }

    // 기타 정보 생성
    document.querySelector(".NumberOfPerson").innerHTML = `
        <input placeholder="총 거리" class="SocialRecruiteTagsContainer__SocialRecruiteTagsInput-sc-2762su-1 gcqwwh max" 
               value="${course.courseDistance}"/>
        <input placeholder="일정" class="SocialRecruiteTagsContainer__SocialRecruiteTagsInput-sc-2762su-1 gcqwwh min"
               value="${course.courseSchedule}"/>
        <input placeholder="테마" class="SocialRecruiteTagsContainer__SocialRecruiteTagsInput-sc-2762su-1 gcqwwh cost"
               value="${course.courseTheme}"/>
    `;

    // 경로 정보 생성
    if (course.paths.length > 0) {
        const destinationList = document.querySelector("#destinationList");

        course.paths.forEach((e, i) => {

            let listItem = document.createElement("li");
            listItem.style.display = "flex";
            listItem.style.justifyContent = "space-between";
            listItem.style.padding = "5px";
            listItem.style.borderBottom = "1px solid #ddd";

            let spotText = document.createElement("span");
            spotText.innerHTML = `<b>${i+1}. ${e.pathName}</b><br>${e.pathAddress}`;
            spotText.style.cursor = "pointer";

            spotText.addEventListener("click", () => map.setCenter(spot.latlng));

            let deleteBtn = document.createElement("img");
            deleteBtn.src =
                "http://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif";
            deleteBtn.classList.add("closeBtn");
            deleteBtn.dataset.index = i+1;
            deleteBtn.style.cursor = "pointer";
            deleteBtn.style.marginLeft = "5px";
            deleteBtn.style.marginBottom = "2px";
            deleteBtn.style.width = "14px";
            deleteBtn.style.height = "14px";

            listItem.appendChild(spotText);
            listItem.appendChild(deleteBtn);
            destinationList.appendChild(listItem);
        });
    }

    // 내용 생성
    document.querySelector(".StorySummaryField_container__MWQ0N").innerHTML = `
        <textarea maxLength="1000" placeholder="내용 입력" class="Textarea_textarea__MWJjO">${course.courseContent} </textarea>
        <p class="StorySummaryField_text__ZTEzY" > ${course.courseContent.length}/1000 </p>
    `;

    // 25.03.12  조승찬 추가 시작 ::
    // tourStpots 생성으로 이동경로 그려주고 , dotOverlays, testOverlays는 createMarkers 에서 생성
    tourSpots.length = 0;
    course.paths.forEach((path, i) => {
        tourSpots.push({ number: i + 1, title:path.pathName, address: path.pathAddress });
    });

    geocoder = new kakao.maps.services.Geocoder();
    remains = tourSpots.length;

    // Promise.all()을 사용하여 모든 주소 검색이 끝난 후 실행
    Promise.all(
        tourSpots.map((spot) => {
            return new Promise((resolve) => {
                geocoder.addressSearch(spot.address, (result, status) => {
                    if (status === kakao.maps.services.Status.OK) {
                        spot.latlng = new kakao.maps.LatLng(
                            Math.floor(result[0].y * 1000000) / 1000000,
                            Math.floor(result[0].x * 1000000) / 1000000
                        );
                    } else {
                        console.warn(`${spot.name} 좌표 변환 실패`);
                    }
                    resolve(); // 변환 완료
                });
            });
        })
    ).then(() => {

        // 좌표 기반 마커 생성
        createMarkers(tourSpots, map);
        // 선 그리기
        drawLine(tourSpots, map);
    });
    // 25.03.12  조승찬 추가 시작 :: 맵 추가

    // 25.03.22 조승찬 추가 시작 :: 파일 추가
    let text = ``;
    // 서버로 전달할 정보 세팅
    // file-name 가 dataset에서는 카멜표기법(fileName)으로 변경됨
    text += `<li  class="uploadFile"     
					data-file-name="${course.courseFileName}" data-file-path="${course.courseFilePath}" data-file-size="${course.courseFileSize}" >`;
    text += `<img src="/images/cancel.jpg" class="file-cancel" alt="calcel"">`;
    const encodedFilePath = encodeURIComponent(`${course.courseFilePath}/${course.courseFileName}`);   // 이미지 파일이 아닌경우 별도의 이미지 파일 제공
    text += `<img src="/files/display?path=${encodedFilePath}" class="image-files" alt="thumbnail">&nbsp;&nbsp;`;                             // 이미지 파일 여부 확인 할 별도 필드도 마련되어야 함
    text += `</li>`;
    document.querySelector(".ImageList-sc-9v1mt2-0.hGJMVS").innerHTML = text;
    // 25.03.22 조승찬 추가 끝 :: 파일 추가

};

// 25.03.22 조승찬 추가 시작
// 업로드된 파일의 썸네일 제공
function createThumbnail(file) {
    console.log(" createThumbnail ");
    let text = ``;
    // 파일 삭제를 위한 index, 서버로 전달할 정보 세팅
    // file-name 가 dataset에서는 카멜표기법(fileName)으로 변경됨
    text += `<li  class="uploadFile"     
					data-file-name="${file.fileName}" data-file-path="${file.filePath}" data-file-size="${file.fileSize}" >`;
    text += `<img src="/images/cancel.jpg" class="file-cancel" alt="calcel"">`;
    const encodedFilePath = encodeURIComponent(`${file.filePath}/${file.fileName}`);   // 이미지 파일이 아닌경우 별도의 이미지 파일 제공
    text += `<img src="/files/display?path=${encodedFilePath}" class="image-files" alt="thumbnail">&nbsp;&nbsp;`;                             // 이미지 파일 여부 확인 할 별도 필드도 마련되어야 함
    text += `</li>`;
    document.querySelector(".ImageList-sc-9v1mt2-0.hGJMVS").innerHTML = text;
    document.querySelector(".ImageList-sc-9v1mt2-0.hGJMVS").scrollIntoView({ behavior: "smooth", block: "start" });   // 추가된 행들이 처지지 않게 위치 잡아주기

}
// 25.03.22 조승찬 추가 끝