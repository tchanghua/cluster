package com.tch.service;

import com.tch.po.Resume;

import java.util.List;

/**
 * @ClassName:ResumeSerice
 * @Description: TODO
 * @Auth: tch
 * @Date: 2020/3/15
 */
public interface ResumeService {
    public List<Resume> qryAll();

    public void save(Resume po);

    public void update(Resume po);

    public void delById(Long id);

    public Resume qryById(Long id);
}
