package com.app.pickcourse.mapper;

import com.app.pickcourse.domain.dto.FeedListDTO;
import com.app.pickcourse.domain.vo.FileVO;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
@Slf4j
public class TogetherFileMapperTests {
    @Autowired
    private TogetherFileMapper mapper;
    @Autowired
    private FileMapper fileMapper;
    @Autowired
    private TogetherFeedMapper togetherFeedMapper;
    @Autowired
    private FeedTagMapper feedTagMapper;

    @Test
    public void postFeedWrite(){
        FileVO fileVO = new FileVO();
        fileVO.setFileName("test");
        fileVO.setFilePath("test");
        fileVO.setFileSize("125");
        fileMapper.postFeedWrite(fileVO);

        mapper.postFeedWrite(fileVO.getId(),50l);
    }


    @Test
    public void getFeedList(){

        List<FeedListDTO> feedList = togetherFeedMapper.getFeedList();
        feedList.forEach(feed -> {
            feed.setFiles(mapper.getFileList(feed.getId()));
            feed.setFeedTags(feedTagMapper.getFeedList(feed.getId()));
        });
        feedList.forEach(System.out::println);

    }

}
