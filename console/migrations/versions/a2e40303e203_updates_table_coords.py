"""updates table coords

Revision ID: a2e40303e203
Revises: 0dba067862e3
Create Date: 2024-09-25 14:05:23.790418

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a2e40303e203'
down_revision = '0dba067862e3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('coordinate', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.String(length=50), nullable=True))
        batch_op.create_foreign_key(None, 'users', ['user_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('coordinate', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('user_id')

    # ### end Alembic commands ###
