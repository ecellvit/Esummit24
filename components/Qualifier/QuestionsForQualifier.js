'use client'
import React from "react";
import questions from "@/constant/round0/questions.json";

export default function QuestionForQualifier(props) {
  return (
    <main>
      <section className="flex flex-col justify-center items-center px-4 select-none">
        {props.questionCategory === "easy" && (
          <div className="flex flex-col text-xl w-fit h-fit p-5 border border-white text-white rounded-lg">
            <div className="text-4xl align-top">Question {props.chronoNumber + 1}</div>
            <div className="select-none">
              {
                questions[props.questionCategory][props.questionNumber]?.q.content
              }
            </div>
            {questions[props.questionCategory][props.questionNumber]?.q
              .contentType === "image" && (
              <img
                src={
                  questions[props.questionCategory][props.questionNumber]?.q
                    .contentLink
                }
               alt="question image"
                className="h-auto w-auto"
               />
            )}
            {questions[props.questionCategory][props.questionNumber]?.q
              .contentType === "audio" && (
              <div>
                
                {typeof(
                  questions[props.questionCategory][props.questionNumber]?.q
                    .contentLink
                ) === "object" ? (
                  <div>
                    <audio controls className="mb-2">
                      <source
                        src={
                          questions[props.questionCategory][
                            props.questionNumber
                          ]?.q.contentLink[0]
                        }
                        type="audio/mpeg"
                      />
                      Your browser does not support the audio element.
                    </audio>
                    <audio controls className="mb-2">
                      <source
                        src={
                          questions[props.questionCategory][
                            props.questionNumber
                          ]?.q.contentLink[1]
                        }
                        type="audio/mpeg"
                      />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                ) : (
                  <audio controls className="mb-2">
                    <source
                      src={
                        questions[props.questionCategory][props.questionNumber]
                          ?.q.contentLink
                      }
                      type="audio/mpeg"
                    />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
            )}
          </div>
        )}
        {props.questionCategory === "medium" && (
          <div className="flex flex-col text-xl w-fit h-fit p-5 border border-white text-white rounded-lg">
            <div className="text-4xl align-top">Question {props.chronoNumber + 11}</div>
            <div>
              {
                questions[props.questionCategory][props.questionNumber]?.q
                  .content
              }
            </div>
            {questions[props.questionCategory][props.questionNumber]?.q
              .contentType === "image" && (
              <img
                src={
                  questions[props.questionCategory][props.questionNumber]?.q
                    .contentLink
                }
                className="w-auto h-auto"
               alt="question image"/>
            )}
            {questions[props.questionCategory][props.questionNumber]?.q
              .contentType === "audio" && (
              <div>
                {typeof(
                  questions[props.questionCategory][props.questionNumber]?.q
                    .contentLink
                ) === "object" ? (
                  <div>
                    <audio controls className="mb-2">
                      <source
                        src={
                          questions[props.questionCategory][
                            props.questionNumber
                          ]?.q.contentLink[0]
                        }
                        type="audio/mpeg"
                      />
                      Your browser does not support the audio element.
                    </audio>
                    <audio controls className="mb-2">
                      <source
                        src={
                          questions[props.questionCategory][
                            props.questionNumber
                          ]?.q.contentLink[1]
                        }
                        type="audio/mpeg"
                      />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                ) : (
                  <audio controls className="mb-2">
                    <source
                      src={
                        questions[props.questionCategory][props.questionNumber]
                          ?.q.contentLink
                      }
                      type="audio/mpeg"
                    />
                    Your browser does not support the audio element.
                  </audio>
                )}
                <div>
                (If you encounter identical audio from previous questions, please refresh the page for the current question.)
              </div>
              </div>
            )}
          </div>
        )}
        {props.questionCategory === "hard" && (
          <div className="flex flex-col text-xl w-fit h-fit p-5 border border-white text-white rounded-lg select-none">
            <div className="text-4xl align-top select-none">Question {props.chronoNumber + 21}</div>
            <div>
              {
                questions[props.questionCategory][props.questionNumber]?.q
                  .content
              }
            </div>
            {questions[props.questionCategory][props.questionNumber]?.q
              .contentType === "image" && (
              <img
                src={
                  questions[props.questionCategory][props.questionNumber]?.q
                    .contentLink
                }
              alt="question image"

              />
            )}
            {questions[props.questionCategory][props.questionNumber]?.q
              .contentType === "audio" && (
              <div>
                {typeof(
                  questions[props.questionCategory][props.questionNumber]?.q
                    .contentLink
                ) === "object" ? (
                  <div>
                  <p>Assertion(A)</p>
                    <audio controls className="mb-2">
                      <source
                        src={
                          questions[props.questionCategory][
                            props.questionNumber
                          ]?.q.contentLink[0]
                        }
                        type="audio/mpeg"
                      />
                      Your browser does not support the audio element.
                    </audio>
                    <p>Reasoning(R)</p>
                    <audio controls className="mb-2">
                      <source
                        src={
                          questions[props.questionCategory][
                            props.questionNumber
                          ]?.q.contentLink[1]
                        }
                        type="audio/mpeg"
                      />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                ) : (
                  <audio controls className="mb-2">
                    <source
                      src={
                        questions[props.questionCategory][props.questionNumber]
                          ?.q.contentLink
                      }
                      type="audio/mpeg"
                    />
                    Your browser does not support the audio element.
                  </audio>
                )}
              <div>
                (If you encounter identical audio from previous questions, please refresh the page for the current question.)
              </div>
              </div>
            )}
          </div>
        )}
        {/* {props.questionCategory === "caseStudy" && (
          <div className="flex flex-col text-xl w-fit h-fit p-5 border border-white text-white rounded-lg">
            <div className="text-4xl align-top">Question {props.chronoNumber + 27}</div>
            <div>
              {
                questions[props.questionCategory][props.questionNumber].q
                  .content
              }
            </div>
            
            
          </div>
        )} */}
      </section>
    </main>
  );
}
