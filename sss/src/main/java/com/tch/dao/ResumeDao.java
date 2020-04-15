package com.tch.dao;

import com.tch.po.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * @ClassName:ResumeDao
 * @Description: TODO
 * @Auth: tch
 * @Date: 2020/3/15
 */
public interface ResumeDao extends JpaRepository<Resume,Long>, JpaSpecificationExecutor<Resume> {

//    @SQLDelete(sql = "DELETE from tb_resume where id = ?1")
//    @Modifying
//    void deleteById(Long id);

//    @SQLInsert(sql = "insert into tb_resume (id,address, name, phone) VALUES (?4,?1,?2,?3)")
//    @Modifying
//    void saveAsSql(String address,String name,String phone,Long id);

//    @SQLUpdate(sql = "update tb_resume set address = ?1, name = ?2, phone = ?3 where id = ?4")
//    @Modifying
//    void updateAsSql(String address,String name,String phone,Long id);

}
