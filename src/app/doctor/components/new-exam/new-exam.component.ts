import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent implements OnInit {
  name = new FormControl("");
  questionForm!: FormGroup;
  question: any[] = []
  nameSubject: any
  correct = ''
  oneStep: boolean = false
  twoStep: boolean = false
  stepIndex = 0
  id: any

  constructor(private toaster: ToastrService, private fb: FormBuilder, private service: DoctorService) {
  }

  ngOnInit(): void {
    localStorage.setItem('pageNow', 'newExam')
    this.generateQuestion()
  }
  start() {
    if (this.name.value == "") {
      this.toaster.error("يرجي ادخال اسم المادة")
    }
    else {
      this.nameSubject = this.name.value
      this.oneStep = true
      // this.stepIndex = 1
    }
  }

  generateQuestion() {
    this.questionForm = this.fb.group({
      question: ['', Validators.required],
      answer1: ['', Validators.required],
      answer2: ['', Validators.required],
      answer3: ['', Validators.required],
      answer4: ['', Validators.required],
      correctAnswer: ['', Validators.required],
    })
  }
  correctAnswer(event: any) {
    this.correct = event.value
  }
  save() {
    if (this.correct) {
      const model = {
        question: this.questionForm.value.question,
        answer1: this.questionForm.value.answer1,
        answer2: this.questionForm.value.answer2,
        answer3: this.questionForm.value.answer3,
        answer4: this.questionForm.value.answer4,
        correctAnswer: this.questionForm.get(this.correct)?.value,
      }
      this.question.push(model)
      this.questionForm.reset()
    } else {
      this.toaster.error("يرجي اختبار الاجابة الصحيحه")
    }
  }
  end() {
    const model = {
      name: this.nameSubject,
      questions: this.question
    }
    if (this.twoStep) {
      this.stepIndex = 2
    } else {
      this.service.createSubject(model).subscribe((res) => {
        this.twoStep = true
        this.id = res
      })
    }
  }
  cancel() {
    this.questionForm.reset()
    this.question = []
    this.nameSubject = ""
    this.name.reset()
    this.stepIndex = 0
    this.oneStep = false
    Number(this.questionForm.value.answer1)
  }
  clearForm() {
    this.questionForm.reset()
  }
  delete(index: any) {
    this.question.splice(index, 1)
    const model = {
      name: this.nameSubject,
      questions: this.question
    }
    this.service.updateQustions(model, this.id.id).subscribe({
    })
  }

}
