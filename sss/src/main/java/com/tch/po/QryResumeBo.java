package com.tch.po;

import java.io.Serializable;
import java.util.List;

/**
 * @ClassName:QryResumeBo
 * @Description: TODO
 * @Auth: tch
 * @Date: 2020/3/16
 */
public class QryResumeBo implements Serializable {
    private List<Resume> resumes;

    public List<Resume> getResumes() {
        return resumes;
    }

    public void setResumes(List<Resume> resumes) {
        this.resumes = resumes;
    }
}