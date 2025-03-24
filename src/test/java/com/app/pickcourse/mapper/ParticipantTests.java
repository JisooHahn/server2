package com.app.pickcourse.mapper;

import com.app.pickcourse.domain.dto.PlanDTO;
import com.app.pickcourse.domain.vo.ParticipantVO;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Slf4j
public class ParticipantTests {
    @Autowired
    private ParticipantMapper participantMapper;

    @Test
    public void testInsertParticipant() {
        ParticipantVO participantVO = new ParticipantVO();

        participantVO.setPlanId(128L);
        participantVO.setMemberId(1L);

        participantMapper.insert(participantVO);
    }

    @Test
    public void testSelectByPlanId() {
        PlanDTO planDTO = new PlanDTO();
        planDTO.setParticipants(participantMapper.selectByPlanId(122L));

        log.info(planDTO.toString());
    }
}
