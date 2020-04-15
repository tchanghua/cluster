package com.tch.sss.controller;

import com.tch.po.QryResumeBo;
import com.tch.po.Resume;
import com.tch.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

/**
 * @ClassName:ResumeController
 * @Description: TODO
 * @Auth: tch
 * @Date: 2020/3/15
 */
@Controller
@RequestMapping(value = "/resume")
public class ResumeController {
    @Autowired
    private ResumeService resumeService;

    @RequestMapping(value = "/qryAll")
    @ResponseBody
    public QryResumeBo qryAll(){
        QryResumeBo bo = new QryResumeBo();
        List<Resume> resumes = resumeService.qryAll();
        bo.setResumes(resumes);
        return bo;
    }

    @RequestMapping(value = "/qryById")
    @ResponseBody
    public ModelAndView qryById(Long id, ModelAndView modelAndView){
        Resume bo = resumeService.qryById(id);
        modelAndView.addObject("bo",bo);
        modelAndView.setViewName("resumeForm");
        return modelAndView;
    }

    @RequestMapping(value = "/save")
    private void save(Long id ,String name,String address,String phone) {
        Resume resume = new Resume();
        resume.setId(id);
        resume.setName(name);
        resume.setAddress(address);
        resume.setPhone(phone);
        resumeService.save(resume);
    }

    @RequestMapping(value = "/update")
    private void update(Resume resume){
        resumeService.update(resume);
    }

    @RequestMapping(value = "/delById")
    private void delById(Long id){
        System.out.println(id);
        resumeService.delById(id);
    }
}