package com.tch.service.impl;

import com.tch.dao.ResumeDao;
import com.tch.po.Resume;
import com.tch.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * @ClassName:ResumService
 * @Description: TODO
 * @Auth: tch
 * @Date: 2020/3/15
 */
@Service
public class ResumeServiceImpl implements ResumeService {
    @Autowired
    private ResumeDao resumeDao;

    @Override
    public List<Resume> qryAll() {
        List<Resume> pos = resumeDao.findAll();
        return pos;
    }

    @Override
    @Transactional
    public void save(Resume po) {
        resumeDao.save(po);
        System.out.println(po);
    }

    @Override
    public void update(Resume po) {
        resumeDao.saveAndFlush(po);
        System.out.println(po);
    }

    @Override
    public void delById(Long id) {
//        resumeDao.delete(id);
        resumeDao.deleteById(id);
    }

    @Override
    public Resume qryById(Long id) {
        Optional<Resume> byId = resumeDao.findById(id);
        return byId.get();
    }
}