package com.uplus.eureka.candidate.model.dto;

public class Candidate {
    private int candidateId;
    private int userId;
    private int pollId;
    private String questionText;
    private String userName;


    public Candidate() {}

    public Candidate(int userId, int pollId) {
        this.userId = userId;
        this.pollId = pollId;
    }

    public int getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(int candidateId) {
        this.candidateId = candidateId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getPollId() {
        return pollId;
    }

    public void setPollId(int pollId) {
        this.pollId = pollId;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }


    public static class PollInfo {
        private int pollId;
        private String questionText;

        public int getPollId() {
            return pollId;
        }

        public void setPollId(int pollId) {
            this.pollId = pollId;
        }

        public String getQuestionText() {
            return questionText;
        }

        public void setQuestionText(String questionText) {
            this.questionText = questionText;
        }
    }

    public static class UserInfo {
        private int userId;
        private String userName;

        public int getUserId() {
            return userId;
        }

        public void setUserId(int userId) {
            this.userId = userId;
        }

        public String getUserName() {
            return userName;
        }

        public void setUserName(String userName) {
            this.userName = userName;
        }
    }

    public static class CandidateInfo {
        private int pollId;
        private String userName;
        private String questionText;
        private int candidateId;
        private String icon;

        public int getPollId() {
            return pollId;
        }

        public void setPollId(int pollId) {
            this.pollId = pollId;
        }

        public String getUserName() {
            return userName;
        }

        public void setUserName(String userName) {
            this.userName = userName;
        }

        public String getQuestionText() {
            return questionText;
        }

        public void setQuestionText(String questionText) {
            this.questionText = questionText;
        }

        public int getCandidateId() {
            return candidateId;
        }

        public void setCandidateId(int candidateId) {
            this.candidateId = candidateId;
        }

        public String getIcon() {
            return icon;
        }

        public void setIcon(String icon) {
            this.icon = icon;
        }
    }
}


