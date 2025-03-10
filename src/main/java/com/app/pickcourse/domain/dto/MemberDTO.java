package com.app.pickcourse.domain.dto;

import com.app.pickcourse.domain.vo.MemberVO;
import lombok.*;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class MemberDTO {
    @EqualsAndHashCode.Include
    private Long id;
    private String memberEmail;
    private String memberPassword;
    private String memberNickname;
    private String memberTell;
    private String memberBirth;
    private String memberGender;
    private int    memberPoint;
    private char   memberIsAct;
    private String createdDate;
    private String updatedDate;

    public MemberVO toVO(){
        MemberVO memberVO = new MemberVO();
        memberVO.setId(id);
        memberVO.setMemberEmail(memberEmail);
        memberVO.setMemberPassword(memberPassword);
        memberVO.setMemberNickname(memberNickname);
        memberVO.setMemberTell(memberTell);
        memberVO.setMemberBirth(memberBirth);
        memberVO.setMemberGender(memberGender);
        memberVO.setMemberPoint(memberPoint);
        memberVO.setMemberIsAct(memberIsAct);
        memberVO.setCreatedDate(createdDate);
        memberVO.setUpdatedDate(updatedDate);

        return memberVO;
    }

    public static MemberDTO fromVO(MemberVO memberVO) {
        MemberDTO memberDTO = new MemberDTO();
        memberDTO.setId(memberVO.getId());
        memberDTO.setMemberEmail(memberVO.getMemberEmail());
        memberDTO.setMemberPassword(memberVO.getMemberPassword());
        memberDTO.setMemberNickname(memberVO.getMemberNickname());
        memberDTO.setMemberTell(memberVO.getMemberTell());
        memberDTO.setMemberBirth(memberVO.getMemberBirth());
        memberDTO.setMemberGender(memberVO.getMemberGender());
        return memberDTO;
    }


}
