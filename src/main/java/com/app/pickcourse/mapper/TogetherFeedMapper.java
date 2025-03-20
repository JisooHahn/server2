package com.app.pickcourse.mapper;

import com.app.pickcourse.domain.dto.FeedDTO;
import com.app.pickcourse.domain.dto.FeedListDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface TogetherFeedMapper {

    void postFeedWrite(@Param("feedId") Long feedId, @Param("memberId") Long memberId);

    List<FeedListDTO> getFeedList();

    Optional<FeedDTO> getFeedModify(Long id);

    void deleteFeedModify(Long id);

    List<FeedListDTO> getMyFeedList(Long loginId);
}
